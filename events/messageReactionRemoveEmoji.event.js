const path = require("path");
module.exports = {
  name: "messageReactionRemoveEmoji",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageReactionRemoveEmoji"),
      arguments
    );
  }
};
