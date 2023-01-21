module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "invite-me",
  description: "Bot Invitation",
  options: undefined,
  commands: undefined,
  dm_permission: false,
  default_permission: null,
  async execute() {
    const [interaction, ...rest] = arguments;
    //console.log(interaction, rest);
    return interaction.reply(this.authorize(
      process.env.DISCORD_API_USER,
      process.env.DISCORD_CLIENT_PERMISSIONS
    ));
  }
};
