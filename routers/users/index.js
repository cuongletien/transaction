const express = require("express");
const router = express.Router();
const userController = require("../../controllers/users/user");

router.get("/", userController.getList);
router.get("/add", userController.create);
router.post("/add", userController.postCreate);
router.get("/update/:id", userController.update);
router.post("/update/:id", userController.postUpdate);
router.get("/:id", userController.delete);

module.exports = router;
