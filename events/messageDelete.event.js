const path = require("path");
module.exports = {
  name: "messageDelete",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageDelete"),
      arguments
    );
  }
};
