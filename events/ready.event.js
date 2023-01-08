const path = require("path");
module.exports = {
  name: "ready",
  once: true,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "ready"), arguments);
  }
};
