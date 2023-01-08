const path = require("path");
module.exports = {
  name: "warn",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "warn"), arguments);
  }
};
