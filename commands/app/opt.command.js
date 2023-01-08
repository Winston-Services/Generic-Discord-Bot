const wait = require("node:timers/promises").setTimeout;

const userOptState = new Map();
module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "opt",
  description: "Opt In/Out of notifications.",
  options: undefined,
  commands: [
    {
      name: "in",
      description:
        "Enable the Reactdrop Role. Opt In to notifications and pings."
    },
    {
      name: "out",
      description:
        "Disable the Reactdrop Role. Opt Out of notifications and pings."
    }
  ],
  dm_permission: false,
  default_permission: null,
  async execute() {
    const [interaction, ...rest] = arguments;
    if (interaction.partial) {
      // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
      try {
        await interaction.fetch();
      } catch (error) {
        console.error("Something went wrong when fetching the message:", error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }
    const currentGuild = await this._client.guilds.fetch(interaction.guild.id);

    const GuildRoles = await currentGuild.roles.fetch();
    
    const ReactDropRole = GuildRoles.filter(
      r => r.name === "ReactDrop"
    ).first();

    if(!ReactDropRole) {
      GuildRoles.create({
        name: process.env.OPT_ROLE,
        color: process.env.OPT_COLOR,
        position: 0,
        mentionable: true,
        managed: true,
        reason: "Opt In and out of interaction notifications."
      });
    }
    const currentGuildMember = await currentGuild.members.fetch(interaction.user.id);
    const memberHasRole = await currentGuildMember.roles.cache.has(
      ReactDropRole.id
    );

    //console.log("React",  ReactDropRole, "Member", MemberRoles);
    if (interaction.options._subcommand === "in") {
      let userOptCurrentState = "out";
      if (!userOptState.has(interaction.user.id)) {
        userOptState.set(interaction.user.id, "in");
      } else {
        userOptCurrentState = userOptState.get(interaction.user.id);
        userOptState.set(interaction.user.id, "in");
      }
      await interaction.reply({
        content: "You are currently opted {OPT_STATE}.".replace(
          "{OPT_STATE}",
          userOptCurrentState
        ),
        ephemeral: true
      });

      if (!memberHasRole) {
        console.log("Role Not Found.");
        await currentGuildMember.roles.add(ReactDropRole.id);
      }
      await wait(2000);
      await interaction.editReply(
        "You have been opted in. You will be pinged by the reactdrop role."
      );
    }
    if (interaction.options._subcommand === "out") {
      let userOptCurrentState = "out";
      if (!userOptState.has(interaction.user.id)) {
        userOptState.set(interaction.user.id, "out");
      } else {
        userOptCurrentState = userOptState.get(interaction.user.id);
        userOptState.set(interaction.user.id, "out");
      }
      await interaction.reply({
        content: "You are currently opted {OPT_STATE}.".replace(
          "{OPT_STATE}",
          userOptCurrentState
        ),
        ephemeral: true
      });

      if (memberHasRole) {
        console.log("Role Found.");
        await currentGuildMember.roles.remove(ReactDropRole.id);
      }
      await wait(2000);
      await interaction.editReply(
        "You have been opted out. You will no longer be pinged by the reactdrop role."
      );
    }
  }
};
