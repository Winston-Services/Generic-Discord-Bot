const path = require("path");
module.exports = {
  name: "guildScheduledEventUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildScheduledEventUpdate"),
      arguments
    );
  }
};
