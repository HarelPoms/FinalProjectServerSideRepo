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

const getPrescriptionWithSubItem = (subItemId) => {
    return Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
};

const updatePrescription = (id, prescriptionToUpdate) => {
    return Prescription.findByIdAndUpdate(id, prescriptionToUpdate, {new: true});
};

const updatePrescriptionSubItem = async (prescriptionId, subItemId) => {
    let prescriptionWithSubItem = await Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
    return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": !prescriptionWithSubItem.medicineList[0].isActive } } , {new:true} );
}

const changeActiveStatusById = (id) => {
    return Prescription.findByIdAndUpdate(id, [{ $set: { isActive: { $not: "$isActive" } } }], {new:true});
}

const deletePrescriptionById = (id) => {
    return Prescription.findByIdAndDelete(id);
}


module.exports = {
    createPrescription,
    getAllPrescriptionData,
    getPrescriptionById,
    getPrescriptionsOfSpecificPatient,
    getPrescriptionsOfSpecificDoctor,
    getPrescriptionWithSubItem,
    updatePrescription,
    updatePrescriptionSubItem,
    changeActiveStatusById,
    deletePrescriptionById
};
