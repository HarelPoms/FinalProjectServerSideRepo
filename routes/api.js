const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const medicineRouter = require("./api/medicine");
const errorHandler = require("../utils/errorHandlerService");

//http://localhost:8181/api/cards
router.use("/medicine", medicineRouter);

//http://localhost:8181/api/auth/
router.use("/users", usersRouter);

router.use((req, res, next) => {
    res.status(404).json({ err: "api not found" });
});

router.use((error, req, res, next) => {
    errorHandler(res, error.status, error.msg);
});

module.exports = router;