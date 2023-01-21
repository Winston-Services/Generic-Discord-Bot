module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "set-username",
  description: "Set the Bots Username",
  options: [
    {
      type: "StringOption",
      name: "username",
      description: "Set the username of the bot.",
      required: true
    }
  ],
  commands: undefined,
  dm_permission: false,
  default_permission: 8,
  async execute() {
    const [interaction, ...rest] = arguments;
    //console.log(interaction, rest);
    const username = interaction.options.getString('username');
    if(username !== ' ')
    return interaction.reply(this.setUsername(username));
    return interaction.reply("Failed to set the username");
  }
};
