module.exports = {
  type: undefined, // 1 | 2 | 3
  name: "ping",
  description: "Ping the bot.",
  options: undefined,
  commands: undefined,
  dm_permission: false,
  default_permission: null,
  async execute() {
    const [interaction, ...rest] = arguments;
    console.log(interaction, rest);
    return interaction.reply("Ping!");
  }
};
