const mongoose = require("mongoose");

const DEFAULT_STRING_SCHEMA_REQUIRED = {
    type: String, trim: true, required: true
};

const HMO_SCHEMA_REQUIRED = {
    id: {type: mongoose.Schema.Types.ObjectId, required:true},
    name: {type: String, required: true}
}

const URL = {
    type: String,
    match: RegExp(
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    ),
    trim: true,
};

module.exports = {DEFAULT_STRING_SCHEMA_REQUIRED, HMO_SCHEMA_REQUIRED, URL};