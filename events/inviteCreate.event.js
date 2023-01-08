const path = require("path");
module.exports = {
  name: "inviteCreate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "inviteCreate"),
      arguments
    );
  }
};
