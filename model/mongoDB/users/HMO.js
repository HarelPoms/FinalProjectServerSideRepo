const mongoose = require("mongoose");

const HMO_SCHEMA_REQUIRED = {
    id: {type: mongoose.Schema.Types.ObjectId, required:true},
    name: {type: String, required: true}
}

module.exports = {HMO_SCHEMA_REQUIRED};