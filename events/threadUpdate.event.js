const path = require("path");
module.exports = {
  name: "threadUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadUpdate"),
      arguments
    );
  }
};
