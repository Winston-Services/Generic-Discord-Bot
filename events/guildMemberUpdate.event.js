const path = require("path");
module.exports = {
  name: "guildMemberUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildMemberUpdate"),
      arguments
    );
  }
};
