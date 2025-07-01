const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const placeOrder = async(req,res)=>{
    const frontend_url = 'http://localhost:5174'

    try {
        const newOrder= await orderModel.create({
            userId: req.userId,
            items:req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await userModel.findByIdAndUpdate(req.userId, {cartData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency: "inr",
                product_data: {
                    name: item.name
                    },
                    unit_amount: item.price*100
                },
                quantity: item.quantity ||1,
            }))
        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name:'Delivery Charges'
                    },
                    unit_amount: 20*100
                }
                ,
                quantity: 1,
            })

            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
                
            })
            
            res.json({session_url: session.url})

    } catch (error) {
        console.log(error)
        res.status(500).json({"message":"Error creating order"})
    }
}

const verifyOrder = async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success==='true'){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({"message":"Payment successfully"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({"message":"Payment failed"});
        }
    }
    catch(error){
        console.log(error);
        res.json({"message":"Error verifying order"});
    }
}

const userOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({userId:req.userId});
        res.status(200).json({data:orders});
    }
    catch(error){
        console.log(error);
        res.status(500).json({"message":"Error fetching orders"});
    }
}

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find();
        res.json({data:orders});
    } catch (error) {
        console.log(error);
        res.json({"message":error.message});
    }
}

const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({"message":"Status updated"});
    } catch (error) {
        console.log(error);
        res.json({"message":error.message});
    }
}

module.exports = {placeOrder, verifyOrder, userOrders, listOrders, updateStatus}