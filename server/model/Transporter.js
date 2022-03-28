const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransporterSchema = new Schema({
  plate: {
    type: String,
    required: true,
  },
  mainLines: [
    {
      type: Schema.Types.ObjectId,
      ref: "lines",
    },
  ],
  minorLines: [
    {
      type: Schema.Types.ObjectId,
      ref: "lines",
    },
  ],
});
TransporterSchema.pre('remove', function(next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  transportDocuments.remove({transporter: this._id}).exec();    
  next();
});
TransporterSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("transporters", TransporterSchema);
