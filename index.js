const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
require("dotenv").config();
const port = process.env.PORT;
const route = require("./routes/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");

// KẾT NỐI DATABASE
database.connect();
// CẤU HÌNH PUG
app.set("views", "./views");
app.set("view engine", "pug");

// CẤU HÌNH CÁC FILE TĨNH
app.use(express.static("public"));

// CÁC BIẾN LOCAL
app.locals.PATH_ADMIN = systemConfig.PATH_ADMIN;

// GHI ĐÈ PHƯƠNG THỨC POST BẰNG PATCH
app.use(methodOverride("_method"));

// CẤU HÌNH PARSER CÁC METHOD PATCH, DELETE
app.use(bodyParser.urlencoded({ extended: false }));

// CẤU HÌNH FLASH - THÔNG BÁO
app.use(cookieParser("quangtruong1703"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// CẤU HÌNH ROUTE
route(app);

app.listen(port, () => {
  console.log("Successfully");
});
