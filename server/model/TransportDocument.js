import mongoose from "mongoose";

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

const TransportDocument = mongoose.model("TransportDocument", TransportDocumentSchema);
export default TransportDocument;
