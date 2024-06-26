const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
  });
  res.render("client/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};
