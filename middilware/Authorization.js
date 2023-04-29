var jwt = require('jsonwebtoken');
const Authorization=(req,res,next)=>{
    let token =req.headers.authorization;
    if(token){
        var decoded = jwt.verify(token, 'password');
        next();
    }else {
        res.send({"msg":"Login again"})
    }
}
module.exports={Authorization}