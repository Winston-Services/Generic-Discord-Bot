const path = require("path");
module.exports = {
  name: "shardDisconnect",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "shardDisconnect"),
      arguments
    );
  }
};
