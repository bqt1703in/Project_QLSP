module.exports.index = (req, res) => {
  res.render("client/pages/product/index.pug");
};
module.exports.edit = (req, res) => {
  res.send("Edit");
};
