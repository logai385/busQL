const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TransportDocumentSchema = new Schema({  
  dateSign: {
    type: Date,
  },
  transporter: {
    type: Schema.Types.ObjectId,
    ref: "transporters",
  },
  line:{
    type: Schema.Types.ObjectId,
    ref: "lines",
  },
  quantity: {
    type: Number,    
  },
  documentImg:{
    type:String,
  },
});

TransportDocumentSchema.index(
  {
    dateSign: 1,
    transporter: 1
  },
  {
    unique: true,
  }
);
TransportDocumentSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("transportDocuments", TransportDocumentSchema);
