const config = require("config");
const normalizationMedicineMongo = require("../../mongoDB/medicines/helpers/normalizationMedicine");
const dbOption = config.get("dbOption");

const normalizeMedicineService = (medicine, userId) => {
    if (dbOption === "mongo") {
        return normalizationMedicineMongo(medicine, userId);
    }
};

module.exports = normalizeMedicineService;