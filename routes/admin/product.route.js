const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const validate = require("../../validates/admin/product.validate");

const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/recycle-bin", controller.recycleBin);
router.delete("/recycle-bin/deleted/:id", controller.deletedInRecycleBin);
router.patch("/recycle-bin/restore/:id", controller.restoreItem);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPOST,
  controller.createPOST
);
router.get("/edit/:id", controller.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createPOST,
  controller.editPATCH
);
router.get("/detail/:id", controller.detail);
module.exports = router;
