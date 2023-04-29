const mongoose=require("mongoose");
const connection= mongoose.connect("mongodb+srv://shanuka:shanujain@atlascluster.hvrdz5m.mongodb.net/mock8");

module.exports={
    connection
}