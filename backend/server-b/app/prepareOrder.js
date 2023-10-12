const {OrderStatus} = require("../enums")

const settings = require("../settings")
const taskSender = require("../rabbit-utils/sendTask")

module.exports.prepareOrder = (order) => {
    console.log("Preparing sandwich...")
    console.log("Warming up bread...")
    const preparationTime = settings.preparationTime * 1000
    console.log(" [x] Task takes %d seconds", settings.preparationTime);
    setTimeout(() => handleSandwichReady(order), preparationTime);
}

const handleSandwichReady = (order) => {
    console.log("Adding toppings...")
    console.log(new Date(), " [x] Done");
    taskSender.addTask(settings.rabbitHost, settings.orderCompletionQueue, {...order, status: OrderStatus.READY})
}
