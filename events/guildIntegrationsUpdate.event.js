const path = require("path");
module.exports = {
  name: "guildIntegrationsUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "guildIntegrationsUpdate"),
      arguments
    );
  }
};
