const config = require("config");
const normalizationPharmaMongo = require("../../mongoDB/pharmas/helpers/normalizationPharma");
const dbOption = config.get("dbOption");

const normalizationPharmaService = (userData) => {
    if (dbOption === "mongo") {
        return normalizationPharmaMongo(userData);
    }
};

module.exports = normalizationPharmaService;