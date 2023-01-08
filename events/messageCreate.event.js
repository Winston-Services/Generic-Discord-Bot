const path = require("path");
require("dotenv");
module.exports = {
  name: "messageCreate",
  once: false,
  async execute(client) {
    this.loadActions(
      path.join(__dirname, "actions", "messageCreate"),
      arguments
    );
  }
};
