const mongoose = require("mongoose");
const Image = require("./Image");
const prescriptionSubItem = require("./PrescriptionSubItem");
const {DEFAULT_STRING_SCHEMA_REQUIRED} = require("./helpers/mongooseValidation");

const prescriptionSchema = new mongoose.Schema({
    image: Image,
    medicineList: [prescriptionSubItem],
    patientId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    patientName : DEFAULT_STRING_SCHEMA_REQUIRED,
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorName: DEFAULT_STRING_SCHEMA_REQUIRED,
    expiryDate : {
        type: Date,
        default: new Date(+new Date() + 30*24*60*60*1000),
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Prescription = mongoose.model("prescriptions", prescriptionSchema);

module.exports = Prescription;