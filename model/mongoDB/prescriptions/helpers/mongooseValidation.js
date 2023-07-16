const DEFAULT_STRING_SCHEMA_REQUIRED = {
    type: String, trim: true, required: true
};

const HMO_SCHEMA_REQUIRED = {
    name: {type: String, required: true, unique: true}
}

module.exports = {DEFAULT_STRING_SCHEMA_REQUIRED, HMO_SCHEMA_REQUIRED};