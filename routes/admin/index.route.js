const dashboardRoutes = require("../admin/dashboard.route");
module.exports = (app) => {
  // Route admin dashboard
  app.use("/admin/dashboard", dashboardRoutes);
};
