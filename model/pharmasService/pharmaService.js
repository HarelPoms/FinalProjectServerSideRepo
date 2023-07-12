const config = require("config");
const pharmasServiceMongo = require("../mongoDB/pharmas/pharmasServiceMdb");
const dbOption = config.get("dbOption");

const registerPharma = (pharmaData) => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.registerPharma(pharmaData);
    }
};

const getPharmaByEmail = (email) => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.getPharmaByEmail(email);
    }
};

const getAllPharmas = () => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.getAllPharmas();
    }
};

const getPharmaById = (id) => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.getPharmaById(id);
    }
};

const updatePharma = (id, pharmaToUpdate) => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.updatePharma(id, pharmaToUpdate);
    }
};

const deletePharmaById = (id) => {
    if (dbOption === "mongo") {
        return pharmasServiceMongo.deletePharmaById(id);
    }
};

module.exports = {
    registerPharma,
    getPharmaByEmail,
    getAllPharmas,
    getPharmaById,
    updatePharma,
    deletePharmaById
};
