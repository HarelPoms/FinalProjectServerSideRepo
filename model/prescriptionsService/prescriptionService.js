const config = require("config");
const prescriptionServiceMongo = require("../mongoDB/prescriptions/prescriptionsServiceMdb");
const dbOption = config.get("dbOption");

const createPrescription = (prescriptionData) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.createPrescription(prescriptionData);
    }
};

const getAllPrescriptions = () => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.getAllPrescriptions();
    }
};

const getPrescriptionById = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.getPrescriptionById(id);
    }
};

const getPrescriptionsByPatient = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.getPrescriptionsOfSpecificPatient(id);
    }
};

const getPrescriptionsByDoctor = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.getPrescriptionsOfSpecificDoctor(id);
    }
};

const updatePrescription = (id, prescriptionToUpdate) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.updatePrescription(id, prescriptionToUpdate);
    }
};

const deletePrescriptionById = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.deletePrescriptionById(id);
    }
};

module.exports = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    getPrescriptionsByPatient,
    getPrescriptionsByDoctor,
    updatePrescription,
    deletePrescriptionById
};
