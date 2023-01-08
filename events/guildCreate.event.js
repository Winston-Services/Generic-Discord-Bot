const path = require("path");
module.exports = {
  name: "guildCreate",
  once: false,
  execute() {
    this.loadActions(path.join(__dirname, "actions", "guildCreate"), arguments);
  }
};
