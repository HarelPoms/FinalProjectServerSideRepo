const PrescriptionSubItem = {
    medicineId: String,
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