const path = require("path");
module.exports = {
  name: "shardError",
  once: false,
  execute(client) {
    this.loadActions(path.join(__dirname, "actions", "shardError"), arguments);
  }
};
