const path = require("path");
module.exports = {
  name: "guildUnavailable",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildUnavailable"),
      arguments
    );
  }
};
