const path = require("path");
module.exports = {
  name: "roleCreate",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "roleCreate"), arguments);
  }
};
