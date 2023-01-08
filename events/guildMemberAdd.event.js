const path = require("path");
module.exports = {
  name: "guildMemberAdd",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildMemberAdd"),
      arguments
    );
  }
};
