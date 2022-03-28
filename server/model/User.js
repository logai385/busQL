const mongoose = require("mongoose");
const { ROLE } = require("../utils/systemSettings");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(ROLE),
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
module.exports = mongoose.model("users", UserSchema);
