const express = require("express");
const cors = require("cors");
const http = require("http");
const rabbitTaskReceiver = require("./rabbit-utils/receiveTask")

const app = express();

// Init message broker
const rabbitHost = "rabbitmq:5672";
const orderCompletionQueue = "orderCompletionQueue";

const mongoHost = "mongodb:27017"
const dbName = "sandwich"
//  Get db
const db = require("./models/db");
// Connect to db
db.connectDB(`mongodb://${mongoHost}/${dbName}`);

const PORT = 8080;

const orderRouter = require("./routes/order");
const sandwichRouter = require("./routes/sandwich");

app.use(cors());
app.options('*', cors());
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

const requestListener = function (req, res) {
  res.json({ response: "Hello from server-a" });
};

app.use("/order", orderRouter);
app.use("/sandwich", sandwichRouter);
app.use("/", requestListener);

const server = http.createServer(app);

// Close server
server.on("close", () => console.log("Server-a closed."));

// Close server
server.on("error", (err) => {
  console.log(`Server-a error: ${err}`);
  server.close();
});

// Server starts listening
server.listen(PORT, () => console.log(`Server-a: Listening on ports: ${PORT}`));

const updateStatus = function (msgBody) {
  console.log(" [x] Get with '%s'", msgBody);
  var orderId = JSON.parse(msgBody)._id;
  console.log(orderId);
};

rabbitTaskReceiver.getTask(rabbitHost, orderCompletionQueue, updateStatus);