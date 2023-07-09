const Medicine = require("./Medicine");

const createMedicine = (MedicineToSave) => {
  let Medicine = new Medicine(MedicineToSave);
  return Medicine.save();
};

const getAllMedicines = () => {
  return Medicine.find();
};

const getMedicineById = (id) => {
  return Medicine.findById(id);
};

const getMedicineByMedicineNumber = (medicineNumber) => {
  return Medicine.findOne({ medicineNumber }, { medicineNumber: 1, _id: 0 });
};

const updateMedicine = (id, MedicineToUpdate) => {
  return Medicine.findByIdAndUpdate(id, MedicineToUpdate, {
    new: true,
  });
};

const deleteMedicine = (id) => {
  return Medicine.findByIdAndDelete(id);
};

const getMedicinesLikedByUser = (id) => {
  return Medicine.find({likes: id});
}

const getMedicinesCreatedByUser = (id) => {
  return Medicine.find({pharma_id: id});
}

module.exports = {
  createMedicine,
  getAllMedicines,
  getMedicineById,
  getMedicineByMedicineNumber,
  getMedicinesLikedByUser,
  getMedicinesCreatedByUser,
  updateMedicine,
  deleteMedicine,
};
