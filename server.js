require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const jsxViewEngine = require("jsx-view-engine");
const Fruit = require("./models/fruit");
const Vegetable = require("./models/vegetable");
const mongoose = require("mongoose");
//Include method override package in order to be able to delete
const methodOverride = require("method-override");

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

//Tells express to serve/use files in the public folder
//This is how we'll use CSS file
app.use(express.static('public'));

//Middleware
app.use((req, res, next) => {
  //console.log("Middleware: I run for all routes");
  next();
});
//This will parse our payload data (captured from our form) to be readable
app.use(express.urlencoded({ extended: false }));
// We'll be adding a query parameter to our delete form named _method
app.use(methodOverride("_method"));

//Seed Route
//adds data to your database for testing purposes
app.get("/fruits/seed", async (req, res) => {
    try {
       await Fruit.create([
        {
            name:'grapefruit',
            color:'pink',
            readyToEat:true
        },
        {
            name:'grape',
            color:'purple',
            readyToEat:false
        },
        {
            name:'avocado',
            color:'green',
            readyToEat:true
        }
       ]);
       res.redirect("/fruits")
    } catch (err) {
        res.status(400).send(err);
    }
})

//////////////////////////////////// FRUITS////////////////////////////////////
//Index Route Fruits
app.get("/fruits", async (req, res) => {
  try {
    const foundFruits = await Fruit.find({});
    res.status(200).render("fruits/Index", { fruits: foundFruits });
  } catch (err) {
    res.status(400).send(err);
  }
});

//New Route Fruits
app.get("/fruits/new", (req, res) => {
  res.render("fruits/New");
});

//Delete Route Fruits

app.delete("/fruits/:id", async (req, res) => {
  //This is what implements the delete functionality
  try {
    //this id is from the (:id) in the url. this is not the db _id
    await Fruit.findByIdAndDelete(req.params.id);
    //redirecting to fruits
    res.status(201).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update Route Fruits
app.put('/fruits/:id', async (req, res) => {
    try {
      if (req.body.readyToEat === 'on') {
        req.body.readyToEat = true;
      }
      else {
        req.body.readyToEat = false;
      }
      const updatedFruit = await Fruit.findByIdAndUpdate(
        // id is from the url that we got by clicking on the edit <a/> tag
        req.params.id, 
        // the information from the form, with the update that we made above
        req.body, 
        // need this to prevent a delay in the update
        {new: true})
        console.log(updatedFruit);
        res.redirect(`/fruits/${req.params.id}`);
    } catch (err) {
      res.status(400).send(err);
    }
  });

//Create Route Fruits
app.post("/fruits", async (req, res) => {
  try {
    req.body.readyToEat = req.body.readyToEat === "on";
    const createdFruit = await Fruit.create(req.body);
    res.status(201).redirect("/fruits");
  } catch (err) {
    res.status(400).send(err);
  }
});

//Edit Route Fruits
app.get("/fruits/:id/edit", async (req, res) => {
  try {
    //Find document in database and update
    const foundFruit = await Fruit.findById(req.params.id);
    // pass in found fruit to edit view as props
    res.render("fruits/Edit", { fruit: foundFruit });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Show Route Fruits
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

//////////////////////////////// VEGETABLES //////////////////////////////////////

//Index Route Veggies
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

// Delete Route Veggies

//Update Route Veggies

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
