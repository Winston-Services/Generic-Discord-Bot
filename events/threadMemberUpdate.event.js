const path = require("path");
module.exports = {
  name: "threadMemberUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "threadMemberUpdate"),
      arguments
    );
  }
};
