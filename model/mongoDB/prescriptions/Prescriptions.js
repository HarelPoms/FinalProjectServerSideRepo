const mongoose = require("mongoose");
const Image = require("./Image");
const {PrescriptionSubItem} = require("./PrescriptionSubItem");
const {DEFAULT_STRING_SCHEMA_REQUIRED, HMO_SCHEMA_REQUIRED} = require("./helpers/mongooseValidation");

const prescriptionSchema = new mongoose.Schema({
    image: Image,
    medicineList: [PrescriptionSubItem],
    patientId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    expiryDate : {
        type: Date,
        default: new Date(+new Date() + 30*24*60*60*1000),
    },
    isApproved: {
        type: Boolean,
        default:false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    HMO: {type: mongoose.Schema.Types.ObjectId, required:true},
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Prescription = mongoose.model("prescriptions", prescriptionSchema);

module.exports = Prescription;