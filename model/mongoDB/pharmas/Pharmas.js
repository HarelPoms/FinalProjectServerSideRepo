const mongoose = require("mongoose");
const Address = require("./Address");
const Image = require("./Image");

const pharmaSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {
        type: String,
        required: true,
        match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    },
    email: {
        type: String,
        require: true,
        match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        match: RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        ),
    },
    image: Image,
    address: Address,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Pharma = mongoose.model("pharmas", pharmaSchema);

module.exports = Pharma;
