const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.changeStatus);
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem);
router.get("/recycle-bin", controller.recycleBin);
router.delete("/recycle-bin/deleted/:id", controller.deletedInRecycleBin);
router.patch("/recycle-bin/restore/:id", controller.restoreItem);
router.get("/create", controller.create);
router.post("/create", controller.createPOST);

module.exports = router;
