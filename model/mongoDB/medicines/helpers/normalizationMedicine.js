const generateMedicineNumber = require("./generateMedicineNumber");

const normalizeMedicine = async (medicine, userId) => {
  if (!medicine.image) {
    medicine.image = {};
  }
  medicine.image = {
    url:
      medicine.image.url ||
      "https://cdn.pixabay.com/photo/2018/09/13/02/17/pills-3673645_1280.jpg",
    alt: medicine.image.alt || "medicine card image",
  };
  return {
    ...medicine,
    medicineNumber: medicine.medicineNumber || (await generateMedicineNumber()),
    user_id: medicine.user_id || userId,
  };
};

module.exports = normalizeMedicine;
