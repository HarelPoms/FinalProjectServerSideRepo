const mongoose = require("mongoose");

const PrescriptionSubItem = new mongoose.Schema({
    medicineId: {type: Number, required: true},
    medicineName: {type: String, required: true},
    medicineUnits: {type: Number, required:true},
    isActive: {
        type: Boolean,
        default: true
    }
});

// const PrescriptionSubItem = {
//     medicineId: Number,
//     medicineName: String,
//     medicineUnits: Number,
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// };

module.exports = {
    PrescriptionSubItem
};