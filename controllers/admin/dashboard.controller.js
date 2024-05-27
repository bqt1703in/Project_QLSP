module.exports.dashboard = (req, res) => {
  // res.send("Trang Dashboard");
  res.render("admin/pages/dashboard/index.pug", {
    pageTitle: "Dashboard",
  });
};
