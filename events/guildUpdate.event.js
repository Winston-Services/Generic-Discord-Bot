const path = require("path");
module.exports = {
  name: "guildUpdate",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "guildUpdate"), arguments);
  }
};
