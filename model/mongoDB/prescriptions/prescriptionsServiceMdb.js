const Prescription = require("./Prescriptions");

const createPrescription = (prescriptionData) => {
    const prescription = new Prescription(prescriptionData);
    return prescription.save();
};

const getAllPrescriptionData = () => {
    return Prescription.find();
};

const getPrescriptionById = (id) => {
    return Prescription.findById(id);
}

const getPrescriptionsOfSpecificPatient = (id) => {
    return Prescription.find({patientId: id});
}

const getPrescriptionsOfSpecificDoctor = (id) => {
    return Prescription.find({doctorId: id});
}

const updatePrescription = (id, prescriptionToUpdate) => {
    return Prescription.findByIdAndUpdate(id, prescriptionToUpdate, {new: true});
};

const changeActiveStatusById = (id) => {
    return Prescription.findByIdAndUpdate(id, [{ $set: { isActive: { $not: "$isActive" } } }], {new:true});
}

const deletePrescriptionById = (id) => {
    return Prescription.findByIdAndDelete(id);
}


module.exports = {
    createPrescription,
    getAllPrescriptionData,
    getPrescriptionsOfSpecificPatient,
    getPrescriptionsOfSpecificDoctor,
    getPrescriptionById,
    updatePrescription,
    changeActiveStatusById,
    deletePrescriptionById
};
