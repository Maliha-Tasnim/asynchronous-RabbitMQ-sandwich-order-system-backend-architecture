const Order = require("../models/order");

function getAllOrders() {
  return Order.find({})
    .then((orders) => orders)
}

function getOrderById(orderId) {
  return Order.findById(orderId)
    .then((order) => order)
}

function deleteOrderById(orderId) {
  return Order.findByIdAndRemove(orderId)
    .then((order) => order)
}

function addOrder(order) {
  return Order.create(order)
    .then((order) => order)
}

function updateOrder(orderId, body) {
  return new Promise(function (resolve, reject) {
    Order.findOneAndUpdate({ _id: orderId }, body, { new: true }, function (err, order) {
      if (err) {
        reject(err);
        return;
      }
      resolve(body);
    })
  });
}

module.exports = { getAllOrders, getOrderById, deleteOrderById, addOrder, updateOrder }
