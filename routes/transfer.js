const express = require("express");
const router = express.Router();

const transactController = require("../controller/transferMoney");

router.get("/transact/:userId",transactController.getTransaction);
router.post("/transfer",transactController.transferMoney);

module.exports = router;