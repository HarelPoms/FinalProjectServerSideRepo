const normalizePharma = (pharmaData) => {
    if (!pharmaData.image) {
        pharmaData.image = {};
    }
    pharmaData.image = {
        url:
        pharmaData.image.url ||
        "https://cdn.pixabay.com/photo/2014/04/03/11/07/pharmacy-311773_1280.png",
        alt: pharmaData.image.alt || "Default Pharma Picture",
    };
    return {
        ...pharmaData,
        address: {
            ...pharmaData.address,
            state: pharmaData.address.state || "",
        },
    };
};

module.exports = normalizePharma;