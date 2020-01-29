const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectID,
                    ref: 'course',
                    required: true
                }
            }
        ]
    }
});

UserSchema.methods.addToCart = function(course){
    const clonedItems = [...this.cart.items];
    const idx = clonedItems.findIndex(item => {
        return item.courseId.toString() === course._id.toString();
    });
    if (idx >= 0) {
        clonedItems[idx].count++;
    } else {
        clonedItems.push({
            courseId: course._id,
            count: 1
        })
    }
    const newCart = {items: clonedItems};
    this.cart = newCart;
    return this.save();
};

module.exports = User = mongoose.model("user", UserSchema, "users");