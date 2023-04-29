const express = require("express");
const { RestaurantModel } = require("../model/RestaurantModel");
const RestaurantRoute = express.Router();

RestaurantRoute.get("/", async (req, res) => {
  let data = await RestaurantModel.find();
  res.status(200).send(data);
});
RestaurantRoute.post("/", async (req, res) => {
  let payload = req.body;
  let data = new RestaurantModel(payload);
  await data.save();
  res.status(200).send("done");
});
RestaurantRoute.get("/:id", async (req, res) => {
  let id = req.params.id;
  let data = await RestaurantModel.find({ _id: id });
  res.status(200).send(data);
});
RestaurantRoute.get("/:id/menu", async (req, res) => {
  let id = req.params.id;
  let data = await RestaurantModel.findOne({ _id: id });
  res.status(200).send(data.menu);
});
RestaurantRoute.post("/:id/menu", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  await RestaurantModel.updateOne({ _id: id }, { $push: { menu: payload } });
  res.status(201).send("done");
});
RestaurantRoute.delete("/:ID/menu/:id", async (req, res) => {
  let id = req.params.id;
  let ID = req.params.ID;
  let arr = [];
  let data = await RestaurantModel.findOne({ _id: ID });
  for (i = 0; i < data.menu.length; i++) {
    if (data.menu[i]._id == id) {
      arr.push(data.menu[i]);
      break;
    }
  }
  await RestaurantModel.updateOne(
    { _id: ID },
    { $pull: { menu: { $in: [arr[0]] } } }
  );
  res.status(201).send("done");
});
module.exports = {
  RestaurantRoute,
};
