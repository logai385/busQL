import mongoose from "mongoose";
const Schema = mongoose.Schema;
const LineSchema = new Schema({
  lineNumber: {
    type: String,
    maxLength: 10,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },  
  status: Boolean,
});
LineSchema.pre("remove", function (next) {
  // 'this' is the client being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  transportDocuments.remove({ line: this._id }).exec();
  next();
});
// LineSchema.set("toObject", {
//   transform: function (doc, ret) {
//     ret.id = ret._id;
//     delete ret._id;
//     delete ret.__v;
//   },
// });
const Line = mongoose.model("Line", LineSchema);
export default Line;
