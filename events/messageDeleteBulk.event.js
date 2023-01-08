const path = require("path");
module.exports = {
  name: "messageDeleteBulk",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "messageDeleteBulk"),
      arguments
    );
  }
};
