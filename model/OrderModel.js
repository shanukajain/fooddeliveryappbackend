const mongoose=require("mongoose")
const OrderSchema=mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    restaurant : { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurants' },
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const OrderModel=mongoose.model("order",OrderSchema);

module.exports={
    OrderModel
}