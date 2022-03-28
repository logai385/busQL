import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TransporterUnitSchema = new Schema({
    name:{
        type: String,
        required: true,
    }
});

const TransporterUnit = mongoose.model("TransporterUnit", TransporterUnitSchema);
export default TransporterUnit;