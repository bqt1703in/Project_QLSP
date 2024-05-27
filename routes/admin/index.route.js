const dashboardRoutes = require("../admin/dashboard.route");
const productRoutes = require("../admin/product.route");
const systemConfig = require("../../config/system");
module.exports = (app) => {
  // Route admin dashboard
  app.use(systemConfig.PATH_ADMIN + "/dashboard", dashboardRoutes);
  app.use(systemConfig.PATH_ADMIN + "/products", productRoutes);
};
