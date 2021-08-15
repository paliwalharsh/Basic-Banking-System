const express = require("express");
const router = express.Router();

const viewController = require("../controller/viewAllCustomers.js");

router.get("/viewAll",viewController.viewAll);
router.get("/viewOne/:userId",viewController.viewOne);

module.exports = router;