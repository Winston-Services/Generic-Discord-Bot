const path = require("path");
module.exports = {
  name: "userUpdate",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "userUpdate"), arguments);
  }
};
