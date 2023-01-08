const path = require("path");
module.exports = {
  name: "shardReconnecting",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "shardReconnecting"),
      arguments
    );
  }
};
