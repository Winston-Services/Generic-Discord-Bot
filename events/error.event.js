const path = require("path");
module.exports = {
  name: "error",
  once: false,
  execute(client) {
    this.loadActions(path.join(__dirname, "actions", "error"), arguments);
  }
};
