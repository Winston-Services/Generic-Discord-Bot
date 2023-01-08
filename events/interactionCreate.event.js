const path = require("path");
module.exports = {
  name: "interactionCreate",
  once: false,
  execute(client, cancel) {
    this.loadActions(
      path.join(__dirname, "actions", "interactionCreate"),
      arguments
    );
  }
};
