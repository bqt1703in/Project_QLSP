const clientRoute = require("./client/index.route");
const adminRoute = require("./admin/index.route");

module.exports = (app) => {
  clientRoute(app);
  adminRoute(app);
};
