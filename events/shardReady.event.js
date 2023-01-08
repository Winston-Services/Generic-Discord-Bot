const path = require("path");
module.exports = {
  name: "shardReady",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "shardReady"), arguments);
  }
};
