const _ = require("lodash");
const mongoose = require("mongoose");
const Medicine = mongoose.models.medicines;

const generateMedicineNumber = async () => {
  try {
    for (let i = 1000000; i <= 9999999; i++) {
      const randomNumber = _.random(1000000, 9999999);
      let medicine = await Medicine.findOne(
        { medicineNumber: randomNumber },
        { medicineNumber: 1, _id: 0 }
      );
      if (!medicine) {
        return randomNumber;
      }
    }
    return null;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = generateMedicineNumber;
