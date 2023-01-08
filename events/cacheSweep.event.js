const path = require("path");
module.exports = {
  name: "cacheSweep",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "cacheSweep"), arguments);
  }
};
