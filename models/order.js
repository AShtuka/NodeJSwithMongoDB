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

// CourseSchema.method('toClient', function () {
//     const course = this.toObject();
//     course.id = course._id;
//     delete course._id;
//     return course;
// })

module.exports = Order = mongoose.model("order", OrderSchema, "orders");