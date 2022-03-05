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
module.exports = mongoose.model("transportDocuments", TransportDocumentSchema);
