const path = require("path");
module.exports = {
  name: "stageInstanceDelete",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "stageInstanceDelete"),
      arguments
    );
  }
};
