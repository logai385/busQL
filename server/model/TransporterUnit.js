const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransporterUnitSchema = new Schema({
    name:{
        type: String,
        required: true,
    }
});
TransporterUnitSchema.set("toObject", {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  });
module.exports = mongoose.model("transporterUnits", TransporterUnitSchema);