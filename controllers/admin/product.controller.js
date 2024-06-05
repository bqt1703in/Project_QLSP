const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

const PATH_ADMIN = require("../../config/system");
// [GET] /admin/products
module.exports.index = async (req, res) => {
  // Điều kiện để lấy data
  let find = {
    deleted: false,
  };
  const filterStatus = filterStatusHelper(req.query); // Lọc sản phẩm theo trạng thái
  if (req.query.status) {
    find.status = req.query.status;
  }
  const objSearch = searchHelper(req.query); // Tìm kiếm sản phẩm
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }

  // Phân trang
  const countProduct = await Product.count(find); // Đếm số lượng sản phẩm
  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    countProduct,
    req.query
  );
  // End phân trang

  // Đếm số lượng sản phẩm có deleted = true
  const countTrash = (await Product.find({ deleted: true })).length;
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  res.render("admin/pages/product/index.pug", {
    pageTitle: "Dashboard - Sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPagination,
    countTrash: countTrash,
  });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("mess", "Thành công rồi");
  res.redirect("back");
};

// [PATCH] /admin/products/change-mutil/
module.exports.changeMulti = async (req, res) => {
  const status = req.body.status;
  const ids = req.body.ids.split(", ");
  switch (status) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      break;
    case "change-position":
      for (const item of ids) {
        const [id, position] = item.split("-");
        await Product.updateOne({ _id: id }, { position: parseInt(position) });
      }
      break;
    default:
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id?_method=DELETE
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() }
  );
  req.flash("mess", "Thay đổi trạng thái sản phẩm thành công");
  res.redirect("back");
};

// [GET] /admin/products/recycle-bin
module.exports.recycleBin = async (req, res) => {
  let find = {
    deleted: true,
  };
  const countProduct = await Product.count(find);
  const objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 4,
    },
    countProduct,
    req.query
  );
  const productsDeleted = await Product.find(find)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);
  res.render("admin/pages/product/recycle-bin.pug", {
    products: productsDeleted,
    pagination: objPagination,
  });
};

// [DELETE] /admin/products/recycle/deleted/:id
module.exports.deletedInRecycleBin = async (req, res) => {
  const id = req.params.id;
  await Product.deleteOne({ _id: id });
  res.redirect("back");
};

// [PATCH] /admin/products/restore/:id
module.exports.restoreItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { deleted: false });
  res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  res.render("admin/pages/product/create.pug", {
    pageTitle: "Tạo mới sản phẩm",
  });
};

// [GET] /admin/products/create
module.exports.createPOST = async (req, res) => {
  if (!req.body.position) {
    const countProducts = await Product.count();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  const product = new Product(req.body);
  await product.save();
  res.redirect(`${PATH_ADMIN.PATH_ADMIN}/products`);
};

// [PATCH] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    res.render("admin/pages/product/edit.pug", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`${PATH_ADMIN.PATH_ADMIN}/products`);
  }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPATCH = async (req, res) => {
  req.body.position = parseInt(req.body.position);
  req.body.price = parseInt(req.body.price);
  req.body.stock = parseInt(req.body.stock);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
  } catch (error) {}

  res.redirect("back");
};
// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  const find = {
    deleted: false,
    _id: req.params.id,
  };
  const product = await Product.findOne(find);

  res.render("admin/pages/product/detail.pug", {
    pageTitle: product.title,
    product: product,
  });
};
