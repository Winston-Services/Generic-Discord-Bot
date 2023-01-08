const path = require("path");
module.exports = {
  name: "applicationCommandPermissionsUpdate",
  once: false,
  execute() {
    this.loadActions(
      path.join(__dirname, "actions", "applicationCommandPermissionsUpdate"),
      arguments
    );
  }
};
