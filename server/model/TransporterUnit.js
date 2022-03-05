const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransporterUnitSchema = new Schema({
    name:{
        type: String,
        required: true,
    }
});
module.exports = mongoose.model("transporterUnits", TransporterUnitSchema);