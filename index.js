const fs = require("fs");
const path = require("path");
//load the configuration file
const currentFolderPath = path.resolve(path.join(__dirname));
require("dotenv").config({
  path: path.join(currentFolderPath, ".env")
});

const {
  Partials,
  IntentsBitField,
  Client,
  SlashCommandBuilder,
  Collection,
  Routes
} = require("discord.js");

const options = {
  applicationId: process.env.DISCORD_API_USER,
  token: process.env.DISCORD_CLIENT_TOKEN
};

const _partials = [
  Partials["Channel"],
  Partials["Message"],
  Partials["Reaction"]
];

const _intents = new IntentsBitField([
  "Guilds",
  "GuildMembers",
  "GuildIntegrations",
  "GuildMessages",
  "GuildMessageReactions"
]);

//setup the bot connection
class GenericDiscordBod {
  _client;
  constructor(params) {
    //load the bots credentials
    this._client = new Client({ partials: _partials, intents: _intents });
  }
  login = async () => {
    await this._client.login(options.token);
    //load the event handlers.
    this.loadEventHandlers(currentFolderPath);
    //add the slash commands
    await this.addSlashCommands(currentFolderPath);
    //start the bot
  };

  //add the slash commands if they have not been added.
  loadSlashCommands = (currentFolderPath) => {
    console.log("Checking for Slash Commands.");
    const startPath = path.resolve(path.join(currentFolderPath, "commands"));
    if (!fs.existsSync(startPath)) {
      throw Error("Error: Command folder not found.");
    }
    console.log("Slash Commands folder found.");

    let botCommands = [];

    //check the global commands folder.
    if (fs.existsSync(path.join(startPath, "app"))) {
        console.log("Loading Global Slash Commands.");

      const commandsPath = path.join(startPath, "app");
      const commandFiles = fs
        .readdirSync(commandsPath)
        .filter(file => file.endsWith(".command.js"));

      for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        botCommands.push(command);
      }
    }

    if (fs.existsSync(path.join(startPath, "guild"))) { 
        console.log("Loading Guild Slash Commands.");
        const commandsPath = path.join(startPath, "guild");
        const commandFiles = fs
          .readdirSync(commandsPath)
          .filter(file => file.endsWith(".command.js"));

        for (const file of commandFiles) {
          const filePath = path.join(commandsPath, file);
          const command = require(filePath);
          botCommands.push(command);
        }
    }

    return botCommands;
  };

  addSlashCommands = async currentFolderPath => {
    // C:\Users\micha\Dropbox\Winston\apps\bots\Dev
    const startPath = path.resolve(path.join(currentFolderPath, "commands"));
    if (!fs.existsSync(startPath)) {
      throw Error("Error: Command folder not found.");
    }

    this.botCommands = this.loadSlashCommands(currentFolderPath);

    const globalCommands = new Collection();
    const guildCommands = new Collection();
    //loop through bot commands and build slash handlers.
    for (const interaction of this.botCommands) {
      const structuredCommand = new SlashCommandBuilder();
      structuredCommand.name = interaction.name;
      structuredCommand.description = interaction.description;
      structuredCommand.setDMPermission(interaction.dm_permission);
      structuredCommand.setDefaultMemberPermissions(
        interaction.default_permission
      );

      if (interaction.commands) {
        try {
          this.commandBuilder(structuredCommand, interaction.commands);
        } catch (error) {
          console.error(error);
          throw Error("Command Initialization Error.");
        }
      }
      if (interaction.options) {
        try {
            this.optionBuilder(structuredCommand, interaction.options);
        } catch (error) {
          console.error(error);
          throw Error("Command Option Initialization Error.");
        }
      }
      if (interaction.guild_id) {
        guildCommands.set(interaction.name, structuredCommand);
      } else {
        globalCommands.set(interaction.name, structuredCommand);
      }
    }
    // ToDo :: Loop Through Approved Guilds and set commands.
    // console.log(guildCommands.values());
    if (guildCommands.size) {
      //add the guild commands to discord.
      await this.updateSlashCommands(
        guildCommands.mapValues(c => c.toJSON()),
        interaction.guild_id //"897546129108008960"
      );
    }
    if (globalCommands.size) {
      //add the bot commands to discord.
      console.log("Global Commands Found Updating now.");
      await this.updateSlashCommands(globalCommands.mapValues(c => c.toJSON()));
    }
    // load all slash commands and add them to discord.
  };

  updateSlashCommands = async (commands, guildId, clientId) => {
    const putGlobalCommands = async (clientId, commands) => {
      console.log("Adding Global Commands to Discord.");
      return await this._client.rest.put(Routes.applicationCommands(clientId), {
        body: commands
      });
    };
    const putGuildCommands = async (clientId, guildId, commands) => {
      console.log("Adding Guild Commands to Discord.");
      return await this._client.rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands }
      );
    };
    if (guildId) {
      return await putGuildCommands(
        clientId ? clientId : this._client.application.id,
        guildId,
        commands
      );
    } else {
      return await putGlobalCommands(
        clientId ? clientId : this._client.application.id,
        commands
      );
    }
  };

  commandBuilder = (builder = new SlashCommandBuilder(), commandArray) => {
    let current = commandArray.shift();
    builder.addSubcommand(subcommand => {
      subcommand.setName(current.name);
      subcommand.setDescription(current.description);
      if (current.options !== undefined && current.options.length) {
        return this.optionBuilder(subcommand, current.options);
      }
      return subcommand;
    });
    if (commandArray.length > 0)
      return this.commandBuilder(builder, commandArray);
  };

  optionBuilder = (command, options = []) => {
    const current = options.shift();
    if (current.type === "StringOption")
      command.addStringOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (current.type === "NumberOption")
      command.addNumberOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (current.type === "UserOption")
      command.addUserOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (current.type === "BooleanOption")
      command.addBooleanOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (current.type === "RoleOption")
      command.addRoleOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (current.type === "ChannelOption")
      command.addChannelOption(option => {
        option.setName(current.name);
        option.setDescription(current.description);
        if (current.required) {
          option.setRequired(current.required);
        }
        return option;
      });
    if (options.length > 0) return this.optionBuilder(command, options);
    return command;
  };

  loadEventHandlers = currentPath => {
    const eventsPath = path.join(currentPath, "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter(file => file.endsWith(".event.js"));
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        this._client.once(event.name, (...args) => {
          event.execute.call(this, ...args);
          delete require.cache[require.resolve(filePath)];
        });
      } else {
        this._client.on(event.name, (...args) => {
          event.execute.call(this, ...args);
          delete require.cache[require.resolve(filePath)];
        });
      }
    }
  };
  actionModules = new Collection();
  loadActions = (currentPath, args = {}, file = "index.action.js") => {
    this.continue = true;
    const actionPath = path.join(currentPath, file);
    if (this.actionModules.has(actionPath)) {
      const eventMiddlewareAction = this.actionModules.get(actionPath);
      // console.info("Action Executed : ", eventMiddlewareAction);
      try {
        eventMiddlewareAction.execute.call(this, ...args, () => {
          this.continue = false;
        });
      } catch (error) {
        this._continue = false;
        console.log(error);
        return;
      }
    } else if (fs.existsSync(actionPath)) {
      const eventMiddlewareAction = require(actionPath);
      this.actionModules.set(actionPath, eventMiddlewareAction);
      // console.info("Action Loaded : ", eventMiddlewareAction);
      try {
        eventMiddlewareAction.execute.call(this, ...args, () => {
          this.continue = false;
        });
      } catch (error) {
        this._continue = false;
        console.log(error);
        delete require.cache[require.resolve(actionPath)];
        return;
      }
    } else {
      console.warn("File not found.", currentPath, file);
    }
  };

  setUsername(username) {
    this._client.user.setUsername(username);
  }
  authorize = (clientId = "594415583638847488", permissionBits = "8") => {
    //console.log(clientId, permissionBits);
    return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=${permissionBits}`;
  };
}
async function main() {
  const RickleFantasyFruitBot = new GenericDiscordBod();
  await RickleFantasyFruitBot.login();
  RickleFantasyFruitBot.setUsername("! RickleFruitBowl");

  console.log(
    "Invite Your Bot :: ",
    RickleFantasyFruitBot.authorize(
      process.env.DISCORD_API_USER,
      process.env.DISCORD_CLIENT_PERMISSIONS
    )
  );
  console.log("Bot Running.");
}
main();
