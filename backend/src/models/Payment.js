const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true
        },
        razorpayOrderId: { 
            type: String, 
            required: true
        },
        razorpayPaymentId: { 
            type: String
        },
        amount: { 
            type: Number, 
            required: true
        },
        status: { 
            type: String, 
            enum: ["pending", "paid"], 
            default: "pending"
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
    }
);

module.exports = mongoose.model("Payment", PaymentSchema);
