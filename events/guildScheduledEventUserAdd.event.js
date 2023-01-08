const path = require("path");
module.exports = {
  name: "guildScheduledEventUserAdd",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildScheduledEventUserAdd"),
      arguments
    );
  }
};
