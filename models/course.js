const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: String,
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'user'
    }
});

CourseSchema.method('toClient', function () {
    const course = this.toObject();
    course.id = course._id;
    delete course._id;
    return course;
})

module.exports = Course = mongoose.model("course", CourseSchema, "courses");