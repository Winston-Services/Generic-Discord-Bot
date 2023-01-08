const path = require("path");
module.exports = {
  name: "debug",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "debug"), arguments);
  }
};
