const config = require("config");
const normalizationPerscriptionMongo = require("../../mongoDB/prescriptions/helpers/normalizationPrescription");
const dbOption = config.get("dbOption");

const normalizationPerscriptionService = (perscriptionData, patientData, doctorData) => {
    if (dbOption === "mongo") {
        return normalizationPerscriptionMongo(perscriptionData, patientData, doctorData);
    }
};

module.exports = normalizationPerscriptionService;
