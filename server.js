const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000 
//IMPORT FRUITS ARRAY FROM FILE IN COMMON JS
const fruits = require("./models/fruits")

//Index route
app.get("/fruits", (req, res) => {
    res.send(fruits);
})

//Show route
app.get("/fruits/:id", (req, res) => {
    res.send(fruits[req.params.id])
})





app.listen(PORT, () => {
    console.log(`We liiiiive on port ${PORT} baby`)
})