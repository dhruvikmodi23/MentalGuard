const express = require("express");
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment.js");
const User = require("../models/User.js");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", authenticateToken, async(req, res) => {
    try {
        console.log("Creating order");
        
        const { amount } = req.body;
        const userId = req.user.id; // Make sure this matches your auth middleware
        
        console.log("Request body:", req.body);
        
        // Create order in Razorpay
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert INR to paise
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        });

        // Save payment record
        const payment = new Payment({
            userId,
            razorpayOrderId: order.id,
            amount,
            status: "pending",
        });

        await payment.save();

        if(!payment) {
            return res.status(500).json({
                success: false,
                message: "Failed to create payment record"
            });
        }

        // Return consistent response structure
        return res.status(201).json({
            success: true,
            order: order,
            message: "Order created successfully"
        });
    } catch (error) {
        console.error("Create order error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error creating order",
            error: error.message
        });
    }
});

router.post("/verify-payment", authenticateToken, async(req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Invalid signature"
            });
        }

        // Update payment record
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { razorpayPaymentId: razorpay_payment_id, status: "paid" },
            { new: true }
        );

        if(!payment) {
            return res.status(500).json({
                success: false,
                message: "Payment verification failed - payment record not found"
            });
        }

        // Update user to premium
        const user = await User.findByIdAndUpdate(
            req.user.id, // Make sure this matches your auth middleware
            { isPremium: true }, 
            { new: true }
        );

        if(!user) {
            return res.status(500).json({
                success: false,
                message: "User status update failed"
            });
        }

        // Return consistent response structure
        return res.status(200).json({
            success: true,
            message: "Payment verification successful",
            user: {
                isPremium: user.isPremium
            }
        });
    } catch (error) {
        console.error("Verify payment error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error verifying payment",
            error: error.message
        });
    }
});

module.exports = router;