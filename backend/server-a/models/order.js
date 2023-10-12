const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    sandwichId: {
        type: String
    },
    status: {
        type: String,
        enum: ["ordered", "received", "inQueue", "ready", "failed"],
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Omit the version key when serialized to JSON
orderSchema.set("toJSON", { virtuals: false, versionKey: false });

const Order = new mongoose.model("Order", orderSchema);

module.exports = Order;
