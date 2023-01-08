const path = require("path");
module.exports = {
  name: "webhookUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "webhookUpdate"),
      arguments
    );
  }
};
