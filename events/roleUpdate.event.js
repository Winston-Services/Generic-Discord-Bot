const path = require("path");
module.exports = {
  name: "roleUpdate",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "roleUpdate"), arguments);
  }
};
