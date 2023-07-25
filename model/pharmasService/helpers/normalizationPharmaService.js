const config = require("config");
const normalizationPharmaMongo = require("../../mongoDB/pharmas/helpers/normalizationPharma");
const dbOption = config.get("dbOption");

const normalizationCreatePharmaService = (userData) => {
    if (dbOption === "mongo") {
        return normalizationPharmaMongo.createNormalizePharma(userData);
    }
};

const normalizationEditPharmaService = (userData) => {
    if (dbOption === "mongo") {
        return normalizationPharmaMongo.editNormalizePharma(userData);
    }
};

module.exports = {normalizationCreatePharmaService, normalizationEditPharmaService};