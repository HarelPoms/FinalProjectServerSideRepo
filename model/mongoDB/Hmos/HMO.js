const HMOSchema = {
    name: {type: String, required: true, unique: true}
}

const HMO = mongoose.model("HMOS", HMOSchema);

module.exports = HMO;