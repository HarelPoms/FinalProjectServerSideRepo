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
    //return Prescription.find({ "_id": prescriptionId, "medicineList._id": subItemId });
    console.log("here");
    return Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
};

const updatePrescription = (id, prescriptionToUpdate) => {
    return Prescription.findByIdAndUpdate(id, prescriptionToUpdate, {new: true});
};

const updatePrescriptionSubItem = async (prescriptionId, subItemId) => {
    let prescriptionWithSubItem = await Prescription.findOne({ medicineList: { $elemMatch: { _id: subItemId } } }, { "medicineList.$": 1 });
    return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": !prescriptionWithSubItem.medicineList[0].isActive } } , {new:true} );
}

//template
//// let prescriptionSubItemStatus = await Prescription.findOne({ "_id": prescriptionId, "medicineList._id": subItemId });
// console.log(prescriptionSubItemStatus);

//works but only set value
//return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": false } } , {new:true} );

//doesnt work
//return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": { "$eq": [false, "$medicineList.$.isActive"] } } } , {new:true} );


//doesnt work
// return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },[{ $set: { "medicineList.$.isActive": { $not: "medicineList.$.isActive" } } }] , {new:true} )

// return Prescription.findOneAndUpdate({ "_id": prescriptionId, "medicineList._id": subItemId },{ "$set": { "medicineList.$.isActive": { $not : "medicineList.$.isActive" } } } , {new:true} )

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
