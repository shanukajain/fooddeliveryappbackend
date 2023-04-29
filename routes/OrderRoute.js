const express=require("express");
const { OrderModel } = require("../model/OrderModel");
const OrderRoute=express();


OrderRoute.get("/",async(req,res)=>{
    let data=await OrderModel.find()
    res.status(200).send(data);
})
OrderRoute.get("/:id",async(req,res)=>{
    let id=req.params.id
    let data=await OrderModel.findOne({"_id":id})
    res.status(200).send(data);
})
OrderRoute.post("/",async(req,res)=>{
    let payload=req.body;
    let order=new OrderModel(payload);
    await order.save();
    res.status(201).send("Order has been placed");

})
OrderRoute.patch("/:id",async(req,res)=>{
    let {status}=req.body;
    let id=req.params.id;
    await OrderModel.findByIdAndUpdate({"_id":id},{status});
    res.status(204).send("status has been changed");
})
module.exports={
    OrderRoute
}