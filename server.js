require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const jsxViewEngine = require("jsx-view-engine");
const mongoose = require("mongoose");

// console.dir(Fruit)
//// database connection //////////////
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Bingo bongo connected to Mongo");
});
//////////////////////////////////////////

//SET DEFAULTS
app.set("view engine", "jsx");
app.set("views", "./views");
app.engine("jsx", jsxViewEngine());

//Middleware
app.use((req, res, next) => {
  console.log("Middleware: I run for all routes");
  next();
});
//This will parse our payload data (captured from our form) to be readable
app.use(express.urlencoded({ extended: false }));

//a route is a path AND the method
//Index route Fruits
app.get("/fruits", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruits });
  } catch (err) {
    res.status(400).send(err);
  }
});
//New route Fruits
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});
//Delete

//Update

//Create
app.post("/fruits", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const createdFruit = await Fruit.create(req.body);
    res.status(201).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit

// Show
app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Index route Veggies
app.get("/vegetables", async (req, res) => {
  try {
    const foundVegetables = await Vegetable.find({});
    res.status(200).render("vegetables/Index", { vegetables: foundVegetables });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New Route Veggies
app.get("/vegetables/new", (req, res) => {
  res.render("vegetables/New");
});

//Create Route Veggies
app.post("/vegetables", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const createdVegetable = await Vegetable.create(req.body);
    res.status(201).redirect("/vegetables");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Show route Veggies
app.get("/vegetables/:id", async (req, res) => {
  //second param of render method MUST be an object
  try {
    const foundVegetable = await Vegetable.findById(req.params.id);
    res.render("vegetables/Show", {
      vegetable: foundVegetable,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`We liiiiive on port ${PORT} baby`);
});
