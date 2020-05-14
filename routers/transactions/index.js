const express = require("express");
const router = express.Router();
const transactionController = require("../../controllers/transactions/transaction");

router.get("/", transactionController.getList);
router.get("/create", transactionController.create);
router.post("/create", transactionController.postCreate);
router.get("/:id/complete", transactionController.detail);
router.post("/:id/complete", transactionController.update);
router.get("/:id", transactionController.delete);

module.exports = router;
