const path = require("path");
module.exports = {
  name: "inviteDelete",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "inviteDelete"),
      arguments
    );
  }
};
