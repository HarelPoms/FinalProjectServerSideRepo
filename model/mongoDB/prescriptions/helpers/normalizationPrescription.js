const normalizePrescription = (prescription, patient) => {
    console.log(patient.HMO);
    if (!prescription.image) {
        prescription.image = {};
    }
    prescription.image = {
        url:
        prescription.image.url ||
        "https://cdn.pixabay.com/photo/2015/11/30/19/08/drug-1070943_1280.jpg",
        alt: prescription.image.alt || "Default Prescription Picture",
    };
    return {
        ...prescription,
        expiryDate: prescription.expiryDate || new Date(+new Date() + 30*24*60*60*1000),
        isActive: prescription.isActive || true,
        HMO: prescription.HMO || (patient.HMO + "")
    };
};

module.exports = normalizePrescription;