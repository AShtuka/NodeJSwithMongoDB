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

UserSchema.methods.removeFromCart = function(id) {
    let items = [...this.cart.items];
    const idx = items.findIndex(item => item.courseId.toString() === id.toString());
    if (items[idx].count === 1) {
        items = items.filter(item => item.courseId.toString() !== id.toString())
    } else {
        items[idx].count--
    }
    this.cart = {items};
    return this.save();
};

UserSchema.methods.cleanCart = function() {
    this.cart = {items: []};
    return this.save();
};

module.exports = User = mongoose.model("user", UserSchema, "users");