const config = require("config");
const normalizationPrescriptionMongo = require("../../mongoDB/prescriptions/helpers/normalizationPrescription");
const dbOption = config.get("dbOption");

const normalizationPrescriptionService = (prescriptionData, patientData) => {
    if (dbOption === "mongo") {
        return normalizationPrescriptionMongo(prescriptionData, patientData);
    }
};

module.exports = normalizationPrescriptionService;
