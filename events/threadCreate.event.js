const path = require("path");
module.exports = {
  name: "threadCreate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadCreate"),
      arguments
    );
  }
};
