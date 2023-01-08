const path = require("path");
module.exports = {
  name: "guildDelete",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "guildDelete"), arguments);
  }
};
