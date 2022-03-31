import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TransportDocumentSchema = new Schema({  
  dateSign: {
    type: Date,
  },
  transporter: {
    type: Schema.Types.ObjectId,
    ref: "Transporter",
  },
  line:{
    type: Schema.Types.ObjectId,
    ref: "Line",
  },
  quantity: {
    type: Number,    
  },
  missQuantity: {
    type: Number,  
    default: 0,  
  },
  documentImg:{
    type:[String],
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
