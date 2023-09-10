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

const getUnassignedPrescriptionsOfSpecificHMO = (id) => {
    return Prescription.find({$and: [{doctorId: null}, {HMO: id}]});
}

const getPrescriptionWithSubItem = (subItemId) => {
    return Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
};

const getPrescriptionsWithSpecificHMO = (id) => {
    return Prescription.find({HMO: id});
}

const updatePrescription = (id, prescriptionToUpdate) => {
    return Prescription.findByIdAndUpdate(id, prescriptionToUpdate, {new: true});
};

const updatePrescriptionSubItemIsActiveStatus = async (prescriptionId, subItemId) => {
    let prescriptionWithSubItem = await Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
    return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": !prescriptionWithSubItem.medicineList[0].isActive } } , {new:true} );
}

const removeSubItemFromPrescription = async (prescriptionId, subItemId) => {
    let prescriptionSubItemList = await Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } });
    let filteredSubItemArray = [];
    for(let i = 0; i < prescriptionSubItemList.medicineList.length; i++){
        if(!((prescriptionSubItemList.medicineList[i]._id + "") == subItemId)){
            filteredSubItemArray.push(prescriptionSubItemList.medicineList[i]);
        }
    }
    let medList = {
        "medicineList": filteredSubItemArray
    }
    return updatePrescription(prescriptionId, medList);
}

const changeActiveStatusById = (id) => {
    return Prescription.findByIdAndUpdate(id, [{ $set: { isActive: { $not: "$isActive" } } }], {new:true});
}

const changeApprovedStatusById = (id) => {
    return Prescription.findByIdAndUpdate(id, [{ $set: { isApproved: { $not: "$isApproved" } } }], {new:true});
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
    getUnassignedPrescriptionsOfSpecificHMO,
    getPrescriptionWithSubItem,
    getPrescriptionsWithSpecificHMO,
    updatePrescription,
    updatePrescriptionSubItemIsActiveStatus,
    changeActiveStatusById,
    changeApprovedStatusById,
    removeSubItemFromPrescription,
    deletePrescriptionById
};
