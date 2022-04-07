import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TransporterSchema = new Schema({
  plate: {
    type: String,
    required: true,
    unique: true,
  },
  mainLines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Line",
    },
  ],
  minorLines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Line",
    },
  ],
  unit:{
    type: Schema.Types.ObjectId,
    ref: "TransporterUnit",
  },
});
TransporterSchema.pre('remove', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  transportDocuments.remove({transporter: this._id}).exec();    
  next();
});

const Transporter = mongoose.model("Transporter", TransporterSchema);
export default Transporter;