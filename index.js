const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const route = require("./routes/index.route");
const database = require("./config/database");

// KẾT NỐI DATABASE
database.connect();
// CẤU HÌNH PUG
app.set("views", "./views");
app.set("view engine", "pug");

// CẤU HÌNH CÁC FILE TĨNH
app.use(express.static("public"));

// CẤU HÌNH ROUTE
route(app);

app.listen(port, () => {
  console.log("Successfully");
});
