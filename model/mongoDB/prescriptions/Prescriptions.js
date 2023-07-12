const mongoose = require("mongoose");
const Image = require("./Image");
const prescriptionSubItem = require("./PrescriptionSubItem");

const prescriptionSchema = new mongoose.Schema({
    image: Image,
    medicineList: [prescriptionSubItem],
    patientDetails  : {patientId: String, patientName: String},
    doctorDetails : {type: String, required: true},
    expiryDate : {
        type: Date,
        default: new Date(+new Date() + 30*24*60*60*1000),
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Prescription = mongoose.model("prescriptions", prescriptionSchema);

module.exports = Prescription;