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
  getPrescriptionById,
  updatePrescription,
  changeActiveStatusById,
  deletePrescriptionById
};
