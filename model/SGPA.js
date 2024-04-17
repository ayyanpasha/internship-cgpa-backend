const { Schema, model } = require("mongoose");

const SPGASchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    semester: {
        type: Number,
        default: false
    },
    points: {
        type: Number,
        default: false
    },
    credits: {
        type: Number,
        default: false
    }
});

const SPGA = model('SPGA', SPGASchema);
SPGA.createIndexes();
module.exports = SPGA;
