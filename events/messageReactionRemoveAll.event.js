const path = require("path");
module.exports = {
  name: "messageReactionRemoveAll",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageReactionRemoveAll"),
      arguments
    );
  }
};
