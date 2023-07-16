const config = require("config");
const HMOsServiceMongo = require("../mongoDB/Hmos/HMOServiceMdb");
const dbOption = config.get("dbOption");

const createHMO = (hmoToSave) => {
    if (dbOption === "mongo") {
        return HMOsServiceMongo.createHMO(hmoToSave);
    }
};

const getAllHMOs = () => {
    if (dbOption === "mongo") {
        return HMOsServiceMongo.getAllHMOs();
    }
};

const getHMOById = (id) => {
    if (dbOption === "mongo") {
        return HMOsServiceMongo.getHMOById(id);
    }
};

const updateHMO = (id, HMOToUpdate) => {
    if (dbOption === "mongo") {
        return HMOsServiceMongo.updateHMO(id, HMOToUpdate);
    }
};

const deleteHMO = (id) => {
    if (dbOption === "mongo") {
        return HMOsServiceMongo.deleteHMO(id);
    }
};

module.exports = {
    createHMO,
    getAllHMOs,
    getHMOById,
    updateHMO,
    deleteHMO,
};

