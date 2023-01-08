const path = require("path");
module.exports = {
  name: "threadDelete",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadDelete"),
      arguments
    );
  }
};
