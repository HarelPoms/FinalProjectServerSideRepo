const HMO = require("./HMO");

const createHMO = (HMOToSave) => {
    let newHMO = new HMO(HMOToSave);
    return newHMO.save();
};

const getAllHMOs = () => {
    return HMO.find();
};

const getHMOById = (id) => {
    return HMO.findById(id);
};

const updateHMO = (id, HMOToUpdate) => {
    return HMO.findByIdAndUpdate(id, HMOToUpdate, {
        new: true,
    });
};

const deleteHMO = (id) => {
    return HMO.findByIdAndDelete(id);
};

module.exports = {
    createHMO,
    getAllHMOs,
    getHMOById,
    updateHMO,
    deleteHMO,
};