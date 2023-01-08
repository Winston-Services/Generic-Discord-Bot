const path = require("path");
module.exports = {
  name: "shardResume",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "shardResume"), arguments);
  }
};
