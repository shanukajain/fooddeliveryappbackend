const experss = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../model/UserMode");
const UserRoute = experss.Router();

UserRoute.get("/",async (req, res) => {
    let data =await UserModel.find();
  res.status(200).send(data);
});
UserRoute.post("/register", async(req, res) => {
let payload=req.body;
try {
    let data=await UserModel.findOne({"email":payload.email})||null;
    // console.log(data);
    if(!data){
    bcrypt.hash(payload.password, 5,async function(err, hash) {
        payload.password=hash;
        let user=new UserModel(payload);
        await user.save();
        });
    res.status(201).send({"msg":"account has been created"});
}else {
    res.status(404).send({"msg":"account already exsit"})
}
} catch (error) {
    res.status(404).send({"msg":"error"})    
}

});
UserRoute.post("/login",async (req, res) => {
    let {email,password}=req.body;
    try {
        let data= await UserModel.findOne({email});
        if(data){
            bcrypt.compare(password,data.password, function(err, result) {
               if(result){
                var token = jwt.sign({ "userid":data._id }, 'password');
                res.status(201).send({"msg":"login successfull","token":token});
               }else {
               res.status(404).send({"msg":"password incorrect"})
               }
            });
        }else{
            res.status(404).send({"msg":"account doesn't exist"})
        }
    } catch (error) {
        
    }
});
UserRoute.patch("/user/:id/reset",async (req, res) => {
  let id = req.params.id;
  let {Current_password,New_password}=req.body;
    let data=await UserModel.findOne({"_id":id});
    console.log(Current_password,New_password,data.password)
    bcrypt.compare(Current_password,data.password,async function(err, result) {
        console.log(result);
        if(result){
            bcrypt.hash(New_password, 5,async function(err, hash) {
                    await UserModel.findByIdAndUpdate({"_id":id},{"password":hash});
                });
                res.status(204).send("done");
        }else {
            res.status(404).send("not done")
        }
     });
  
  
});
module.exports = {
  UserRoute,
};
