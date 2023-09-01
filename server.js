const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000 
//IMPORT FRUITS AND VEGETABLES ARRAY FROM FILES IN COMMON JS
const fruits = require("./models/fruits");
const vegetables = require("./models/vegetables");
const jsxViewEngine = require("jsx-view-engine");

//SET DEFAULTS
app.set("view engine", 'jsx');
app.engine("jsx", jsxViewEngine());


//Index route Fruits
app.get("/fruits", (req, res) => {
    res.render("fruits/Index", { fruits })
})

//Show route Fruits
app.get("/fruits/:id", (req, res) => {
    //second param of render method MUST be an object
    res.render("fruits/Show", {
        fruit: fruits[req.params.id]
    })
})

//Index route Veggies
app.get("/vegetables", (req, res) => {
    res.render("./vegetables/Index", { vegetables })
})

//Show route Veggies
app.get("/vegetables/:id", (req, res) => {
    //second param of render method MUST be an object
    res.render("vegetables/Show", {
        vegetable: vegetables[req.params.id]
    })
})





app.listen(PORT, () => {
    console.log(`We liiiiive on port ${PORT} baby`)
})