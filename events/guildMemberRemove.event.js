const path = require("path");
module.exports = {
  name: "guildMemberRemove",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildMemberRemove"),
      arguments
    );
  }
};
