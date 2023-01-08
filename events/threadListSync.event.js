const path = require("path");
module.exports = {
  name: "threadListSync",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadListSync"),
      arguments
    );
  }
};
