const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LineSchema = new Schema({
    lineNumber:{
        type: Number,
        min: 1,
        required: true,
        unique: true,
    },
    description:{
        type: String,        
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    status:Boolean,
});
LineSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    transportDocuments.remove({line: this._id}).exec();    
    next();
});
module.exports = mongoose.model("lines", LineSchema);