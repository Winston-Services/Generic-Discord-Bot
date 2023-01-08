const path = require("path");
module.exports = {
  name: "stageInstanceUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "stageInstanceUpdate"),
      arguments
    );
  }
};
