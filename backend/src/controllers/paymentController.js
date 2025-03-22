const {Razorpay} = require("razorpay");
const {crypto} = require("crypto");
const {Payment} = require("../models/paymentmodel.js");
// import { asyncHandler } from "../utils/asyncHandler.js"
// import {ApiError} from "../utils/ApiError.js"
// import { ApiResponse } from "../utils/ApiResponse.js";
const { User } = require("../models/User.js");
// import { sendEmail } from "../utils/Nodemailer.js"

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Use your actual key
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

//  function testRazorpay() {
//     console.log(process.env.RAZORPAY_KEY_ID);
    
// }

// testRazorpay();

const createOrder = async(req, res) => {

    console.log("inside controller");
    
    
    const { amount } = req.body;
    const userId = req.user._id
    console.log("req body : ",req.body);
    
    
    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await razorpay.orders.create({
        amount: amount * 100, // Convert INR to paise
        currency: "INR",
        receipt: "test_receipt_123",
    });

    const payment = new Payment({
        userId,
        razorpayOrderId: order.id,
        amount,
        status: "pending",
    });

    await payment.save();

    if(!payment){
        res.status(500).send("Server error for Order");
    }

    res
    .status(201)
    .json(  {message : "order complete succesfully!"})

}

const verifyPayment = async(req, res) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        
        res.status(400).send("Invalid Signature")
    }

    await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, status: "paid" }
    );

    if(!Payment){
        res.status(500).send("payment verification failed")
    }

    

    const user = await User.findByIdAndUpdate(
        req.user._id, 
        { isPremium: true }, 
        { new: true }
    );
    user.save()

    console.log(user);
    

    if(!user){
        throw new ApiError(500,"user status is not updated")
    }

    // const emailSubject = "🎉 Premium Membership Activated - Welcome to Exclusive Benefits!"
    // const emailText = `
    //     Dear ${user.username},

    //     Congratulations! 🎉 You are now a Premium Member of Job Portal.

    //     Enjoy your exclusive benefits, including:
    //     ✅ Priority job applications  
    //     ✅ Direct messaging with recruiters  
    //     ✅ Access to premium job listings  
    //     ✅ AI-powered resume analyzer  
    //     ✅ Enhanced profile visibility  

    //     Start exploring your premium perks now:  
    //     👉 [Go to Dashboard](https://JobConnect.com/dashboard)

    //     If you have any questions, feel free to contact our support team at support@jobconnect.com.

    //     Best regards,  
    //     The Job Portal Team 🚀
    //     `;


    // await sendEmail(user.email, emailSubject, emailText);

    // console.log("email sent!");
    
    


    res
    .status(200)
    .json({message:"payment verification sucessful!"})

    
}

export{
    createOrder,
    verifyPayment
}