const generateMedicineNumber = require("./generateMedicineNumber");

const normalizeMedicine = async (medicine, pharmaId) => {
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
    pharma_id : medicine.pharma_id || pharmaId
  };
};

module.exports = normalizeMedicine;
