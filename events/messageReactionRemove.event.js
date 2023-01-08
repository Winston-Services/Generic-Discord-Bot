const path = require("path");
module.exports = {
  name: "messageReactionRemove",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageReactionRemove"),
      arguments
    );
  }
};
