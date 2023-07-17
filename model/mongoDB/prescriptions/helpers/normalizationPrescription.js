const normalizePerscription = (perscription, patient) => {
    if (!perscription.image) {
        perscription.image = {};
    }
    perscription.image = {
        url:
        perscription.image.url ||
        "https://cdn.pixabay.com/photo/2015/11/30/19/08/drug-1070943_1280.jpg",
        alt: perscription.image.alt || "Default Perscription Picture",
    };
    return {
        ...perscription,
        expiryDate: perscription.expiryDate || new Date(+new Date() + 30*24*60*60*1000),
        isActive: perscription.isActive || true,
        HMO: perscription.HMO || patient.HMO
    };
};

module.exports = normalizePerscription;