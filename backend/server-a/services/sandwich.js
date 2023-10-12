const Sandwich = require("../models/sandwich.js");

function getAllSandwiches() {
    return Sandwich.find({})
        .then((sandwiches) => sandwiches)
}

function getSandwichById(sandwichId) {
    return Sandwich.findById(sandwichId)
        .then((sandwich) => sandwich)
}

function deleteSandwichById(sandwichId) {
    return Sandwich.findByIdAndRemove(sandwichId)
        .then((sandwich) => sandwich)
}

function addSandwich(sandwich) {
    return Sandwich.create(sandwich)
        .then((sandwich) => sandwich)
}

function updateSandwich(sandwichId, sandwich) {
    const query = { "_id": sandwichId }
    return Sandwich.findOneAndUpdate(query, { $set: sandwich })
        .then((sandwich) => sandwich)
}

function resetSandwich(sandwich) {
    return Sandwich.deleteMany({})
        .then(() => addSandwich(sandwich))
}


module.exports = { getAllSandwiches, getSandwichById, deleteSandwichById, addSandwich, updateSandwich, resetSandwich }
