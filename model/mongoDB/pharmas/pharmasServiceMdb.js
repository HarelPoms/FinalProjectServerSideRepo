const Pharma = require("./Pharmas");

const registerPharma = (userData) => {
    const user = new Pharma(userData);
    return user.save();
};

const getPharmaByEmail = (email) => {
    return Pharma.findOne({ email });
};

const getAllPharmas = () => {
    return Pharma.find();
};

const getPharmaById = (id) => {
    return Pharma.findById(id);
}

const updatePharma = (id, pharmaToUpdate) => {
    return Pharma.findByIdAndUpdate(id, pharmaToUpdate, {new: true});
};

const deletePharmaById = (id) => {
    return Pharma.findByIdAndDelete(id);
}


module.exports = {
    registerPharma,
    getPharmaByEmail,
    getAllPharmas,
    getPharmaById,
    updatePharma,
    deletePharmaById
};