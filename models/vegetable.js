const mongoose = require("mongoose");

const vegetableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String, required: true },
    img: String,
    readyToEat: Boolean
}, {
    timestamps: true
})

const Vegetable = mongoose.model("vegetable", vegetableSchema);

module.exports = Vegetable;























// const vegetables = [
//     {
//         name:'Zucchini',
//         color: 'green',
//         readyToEat: true
//     },
//     {
//         name:'Corn',
//         color: 'yellow',
//         readyToEat: false
//     },
//     {
//         name:'Carrots',
//         color: 'orange',
//         readyToEat: true
//     },
//     {
//         name:'Eggplant',
//         color: 'purple',
//         readyToEat: false
//     },
//     {
//         name:'Asparagus',
//         color: 'green',
//         readyToEat: true
//     }
// ]

// module.exports = vegetables;