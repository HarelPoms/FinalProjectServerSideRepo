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

const getUnassignedPrescriptionsOfSpecificHMO = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.getUnassignedPrescriptionsOfSpecificHMO(id);
    }
}

const changePrescriptionActiveStatusById = (id) => {
    if (dbOption === "mongo") {
        return prescriptionServiceMongo.changeActiveStatusById(id);
    }
};

const changePrescriptionApprovedStatusById = (id) => {
    if (dbOption === "mongo"){
        return prescriptionServiceMongo.changeApprovedStatusById(id);
    }
}

const changePrescriptionSubItemActiveStatus = (prescriptionId, subItemId) => {
    if (dbOption === "mongo"){
        return prescriptionServiceMongo.updatePrescriptionSubItemIsActiveStatus(prescriptionId, subItemId);
    }
}

const getPrescriptionWithSubItem = (subItemId) => {
    if (dbOption === "mongo"){
        return prescriptionServiceMongo.getPrescriptionWithSubItem(subItemId);
    }
}

const getPrescriptionsWithSpecificHMO = (id) => {
    if (dbOption === "mongo"){
        return prescriptionServiceMongo.getPrescriptionsWithSpecificHMO(id);
    }
}

const removeSubItemFromPrescription = (prescriptionId, subItemId) => {
    if (dbOption === "mongo"){
        return prescriptionServiceMongo.removeSubItemFromPrescription(prescriptionId, subItemId);
    }
}

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
    getUnassignedPrescriptionsOfSpecificHMO,
    getPrescriptionWithSubItem,
    getPrescriptionsWithSpecificHMO,
    removeSubItemFromPrescription,
    changePrescriptionActiveStatusById,
    changePrescriptionApprovedStatusById,
    changePrescriptionSubItemActiveStatus,
    updatePrescription,
    deletePrescriptionById
};
