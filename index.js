const express = require("express");
const app = express();
const port = 3000;
const route = require("./routes/client/index.route");
// CẤU HÌNH PUG
app.set("views", "./views");
app.set("view engine", "pug");

// CẤU HÌNH ROUTE
route(app);

app.listen(port, () => {
  console.log("Successfully");
});
