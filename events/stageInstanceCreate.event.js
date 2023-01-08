const path = require("path");
module.exports = {
  name: "stageInstanceCreate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "stageInstanceCreate"),
      arguments
    );
  }
};
