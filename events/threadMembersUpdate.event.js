const path = require("path");
module.exports = {
  name: "threadMembersUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadMembersUpdate"),
      arguments
    );
  }
};
