const path = require("path");
module.exports = {
  name: "raw",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "raw"), arguments);
  }
};
