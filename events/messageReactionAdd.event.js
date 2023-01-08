const path = require("path");
module.exports = {
  name: "messageReactionAdd",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageReactionAdd"),
      arguments
    );
  }
};
