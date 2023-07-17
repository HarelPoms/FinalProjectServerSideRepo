const config = require("config");
const normalizationPerscriptionMongo = require("../../mongoDB/prescriptions/helpers/normalizationPrescription");
const dbOption = config.get("dbOption");

const normalizationPerscriptionService = (perscriptionData, patientData) => {
    if (dbOption === "mongo") {
        return normalizationPerscriptionMongo(perscriptionData, patientData);
    }
};

module.exports = normalizationPerscriptionService;
