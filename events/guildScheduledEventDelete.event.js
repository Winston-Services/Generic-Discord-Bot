const path = require("path");
module.exports = {
  name: "guildScheduledEventDelete",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildScheduledEventDelete"),
      arguments
    );
  }
};
