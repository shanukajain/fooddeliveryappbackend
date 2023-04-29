const express=require("express");
const { connection } = require("./config/db");
const { UserRoute } = require("./routes/UserRoute");
const { RestaurantRoute } = require("./routes/RestaurantRoute");
const { OrderRoute } = require("./routes/OrderRoute");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
res.send("Home page");
})

app.use("/api",UserRoute);
app.use("/api/restaurant",RestaurantRoute);
app.use("/api/orders",OrderRoute);
app.listen(3000,async()=>{
    try {
        await connection
        console.log("connected to DB and port 3000");
    } catch (error) {
        console.log("error")
    }
    
})