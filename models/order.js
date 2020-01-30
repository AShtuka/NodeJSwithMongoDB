const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            },
        }
    ] ,
    user : {
        name: String,
        userId: {
            type: Schema.Types.ObjectID,
            ref: 'user',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Order = mongoose.model("order", OrderSchema, "orders");