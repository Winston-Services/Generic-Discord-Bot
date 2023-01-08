const path = require("path");
module.exports = {
  name: "roleDelete",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "roleDelete"), arguments);
  }
};
