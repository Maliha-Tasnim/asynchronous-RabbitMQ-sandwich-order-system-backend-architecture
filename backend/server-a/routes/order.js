const express = require("express");
const router = express.Router();

const rabbitHost = "rabbitmq:5672";
const rabbitTaskSender = require("../rabbit-utils/sendTask")
const orderGenerationQueue = "orderGenerationQueue";

const orderService = require("../services/order.js");

/* GET order by id. */
router.get("/:orderId", async function (req, res) {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.getOrderById(orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});

/* DELETE order by id. */
router.delete("/:orderId", async function (req, res) {
    const orderId = req.params.orderId;
    try {
        const order = await orderService.deleteOrderById(orderId);
        res.status(200).json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/* GET all orders. */
router.get("/", async function (req, res) {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

/* Post and order. */
router.post("/", async function (req, res) {
    const newOrder = req.body;
    try {
        const order = await orderService.addOrder({ ...newOrder, status: "received" });
        rabbitTaskSender.addTask(rabbitHost, orderGenerationQueue, order)
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
