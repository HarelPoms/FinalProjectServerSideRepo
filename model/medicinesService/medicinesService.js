const config = require("config");
const medicinesServiceMongo = require("../mongoDB/medicines/medicinesServiceMdb");
const dbOption = config.get("dbOption");

const createMedicine = (cardToSave) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.createMedicine(cardToSave);
  }
};

const getAllMedicines = () => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.getAllMedicines();
  }
};

const getMedicineById = (id) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.getMedicineById(id);
  }
};

const getMedicineByMedicineNumber = (medicineNumber) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.getMedicineByMedicineNumber(medicineNumber);
  }
};

const getMedicinesCreatedByUser = (id) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.getMedicinesCreatedByUser(id);
  }
};

const getMedicinesLikedByUser = (id) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.getMedicinesLikedByUser(id);
  }
};

const updateMedicine = (id, medicineToUpdate) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.updateMedicine(id, medicineToUpdate);
  }
};

const deleteMedicine = (id) => {
  if (dbOption === "mongo") {
    return medicinesServiceMongo.deleteMedicine(id);
  }
};

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
