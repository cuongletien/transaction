const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/books/book");

router.get("/", bookController.getList);
router.get("/add", bookController.create);
router.post("/add", bookController.postCreate);
router.get("/update/:id", bookController.update);
router.post("/update/:id", bookController.postUpdate);
router.get("/:id", bookController.delete);

module.exports = router;
