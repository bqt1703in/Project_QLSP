const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {
  // Route trang chủ
  app.use("/", homeRoutes);
  // Route trang danh sách sản phẩm
  app.use("/products", productRoutes);
};
