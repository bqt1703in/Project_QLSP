module.exports.index = (req, res) => {
  res.render("client/pages/product/index.pug", {
    pageTitle: "Danh sách sản phẩm",
  });
};
