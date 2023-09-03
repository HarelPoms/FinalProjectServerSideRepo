const mongoose = require("mongoose");
const Image = require("./Image");

const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const medicineSchema = new mongoose.Schema({
  name: DEFAULT_STRING_SCHEMA_REQUIRED,
  subTitle: DEFAULT_STRING_SCHEMA_REQUIRED,
  description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  price: {type:Number, minLength:2, maxLength:3, required:true},
  web: URL,
  image: Image,
  medicineNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  pharma_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  prescription_required: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Medicine = mongoose.model("medicines", medicineSchema);

module.exports = Medicine;
