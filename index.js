const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const route = require("./routes/client/index.route");
// CẤU HÌNH PUG
app.set("views", "./views");
app.set("view engine", "pug");

// CẤU HÌNH ROUTE
route(app);

app.listen(port, () => {
  console.log("Successfully");
});
