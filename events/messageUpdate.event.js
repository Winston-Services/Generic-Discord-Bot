const path = require("path");
module.exports = {
  name: "messageUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageUpdate"),
      arguments
    );
  }
};
