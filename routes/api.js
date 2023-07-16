const express = require("express");
const router = express.Router();

const usersRouter = require("./api/users");
const medicineRouter = require("./api/medicines");
const pharmaRouter = require("./api/pharmas");
const prescriptionRouter = require("./api/prescriptions");
const hmosRouter = require("./api/hmos");
const errorHandler = require("../utils/errorHandlerService");

//http://localhost:8181/api/medicines
router.use("/medicines", medicineRouter);

//http://localhost:8181/api/users
router.use("/users", usersRouter);

//http://localhost:8181/api/pharmas
router.use("/pharmas", pharmaRouter);

//http://localhost:8181/api/prescriptions
router.use("/prescriptions", prescriptionRouter);

//http://localhost:8181/api/prescriptions
router.use("/hmos", hmosRouter);

router.use((req, res, next) => {
    res.status(404).json({ err: "api not found" });
});

router.use((error, req, res, next) => {
    errorHandler(res, error.status, error.msg);
});

module.exports = router;