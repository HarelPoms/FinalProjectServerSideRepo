const PrescriptionSubItem = {
    medicineId: Number,
    medicineName: String,
    medicineUnits: Number,
    isActive: {
        type: Boolean,
        default: true
    }
};

module.exports = {
    PrescriptionSubItem
};