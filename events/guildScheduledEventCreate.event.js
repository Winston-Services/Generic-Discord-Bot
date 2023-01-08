const path = require("path");
module.exports = {
  name: "guildScheduledEventCreate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildScheduledEventCreate"),
      arguments
    );
  }
};
