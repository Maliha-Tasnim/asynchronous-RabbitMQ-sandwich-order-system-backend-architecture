const express = require("express")
const taskReceiver = require("./rabbit-utils/receiveTask");
const settings = require("./settings");

const app = express()

taskReceiver.getTask(settings.rabbitHost, settings.orderGenerationQueue)

app.listen(settings.serverPort, () => {
    console.log(`Server B: http://localhost:${settings.serverPort}`)
})
