## Project Overview

This is a sandwich ordering web application. It is mostly focused on the backend development. In this application, user can order sandwich with the help of frontend. Order is placed and processed in the backend. This project is divided into three main parts for modularity and performance balancing i.e. frontend, server A and server B in the backend. The sandwich order application follows loosely coupled architecture. For asynchronous communication, mediator approach is used. Hence, the communication part is taken care of by RabbitMQ. A high level overview of the project is illustrated below:



![High level architecture](High%20level%20architecture.jpg)

All the parts of the software can be started with

```bash
docker-compose up --build
```

The ports exposed are as follows:

| Application | Port |
| ----------- | ---- |
| Server A    | 8080 |
| Server B    | 8000 |
| Frontend    | 3000 |

The ports are quite popular for development environments.
In production, they should run behind a reverse proxy using HTTPS port 443.

Queues used are

- _orderGenerationQueue_, new orders are placed to this queue.
- _orderCompletionQueue_, completed "ready" orders are put to this one.

### Testing

For manual testing:

1. `docker-compose up --build`
2. Wait for containers to start
3. Open `http://localhost:3000` in browser
4. Click a button "ADMINS"
5. Click "Add"
6. Fill every field.
7. Click "Sandwiches" in menu
8. Click "Order"
9. Click "Confirm"
10. Wait for 10 seconds

## Front-end

The final build doesn't auto-refresh so in development mode it can be run as

```bash
cd frontend
yarn install
yarn start
```

### Application Structure

The frontend is React _single-page application. It was created with _Create React App_. It only contains three views

- sandwich listing
- payment confirm
- order listing.

Most of the third-party dependencies have been avoided and experimented with different way to implement same things.
The notable summary of technologies are:

- React
- Vanilla JavaScript
- CSS Modules for scoping the css
- Axios for API communication


The structure of the application is as below:

![1](https://github.com/user-attachments/assets/7402b306-5e99-4e2f-904e-2245471c4ccf)




### Event Based Architeture

This is an experiment for switching views without Redux and React Contexts, and it uses events to request view changes. The app shell will load the listener for it.

After the listener is up, the content is swapped by calling this:


![image](https://github.com/user-attachments/assets/05b15b8e-96de-4084-9232-9c450d52f1ba)



The similar architecture is used with showing notifications:

![image](https://github.com/user-attachments/assets/86a6d597-ab49-4094-b2ae-3bd97b6ab9aa)


### CSS Architecture

The styles follow a style of defining css constants as below:

![image](https://github.com/user-attachments/assets/efc02cda-8313-475a-9b67-71d40e69e395)


This forms the global base values to be used anywhere as `var(--constant-name)`. The idea of doing it like this is to allow overriding them and keeping them in one place while scoping the styles.

### Services

The communication to backend is split to Services that only return the data or a rejects the Promise.

### Polling for orders

As websockets are not using, the server cannot tell us which order is ready, so polling is used to refresh the listing.

1. Order listing received.
2. Set timeout for polling.
3. Poll the server.
4. Go to step 1.

The `setTimeout` is used because `setInterval` can cause buggy calls if view is changed and it is not cleared properly.
Low interval is used since, server B has low response time.

### Routing

The _routing_ is done by putting component and router name mapping to `routers.js`. The `App.js` will then swap the content by route name if an `content-swich` event is dispatched.

### State Persistence

Because of SPA application, it doesn't have dedicated urls to visit so
whenever view changes, it saves the route name to _session storage_.
If page is reloaded, the application will read the view name and open the view.

# Backend

## Server A

### Structure of Server A

In Server A, different folders are created to refactor the code. Implementation of MongoDb connection and schema definitions are located in _models_ directory, _rabbit-utils_ is for sending and receiving order in the queues of RabbitMq, _routes_ is used for the routing of API requests, and required services are defined in the _services_ folder. Server A runs on node.js and uses libraries such as express, mongoose, cors and amqplib and these dependecies are defined in the _package.json_ file.

### Implementation

- Implementation of Order API
- Implementation of Sandwich API

Here are the functionalities that Server A provides:

1. Add a sandwich using the endpoint http://localhost:8080/sandwich/ with request POST. The response will be sandwich object id in JSON format.

2. Get a sandwich using the endpoint http://localhost:8080/sandwich/sandwichid with request GET. The response will be the sandwich object in JSON format.

3. Get a sandwich using the endpoint http://localhost:8080/sandwich with request GET. The response will be an array of Sandwich objects in JSON format.

4. Modify a sandwich with a POST request for the endpoint http://localhost:8080/sandwich/sandwichid. It will return the sandwich object id in JSON format.

5. Delete a sandwich using the request DELETE with the endpoint
   http://localhost:8080/sandwich/sandwichid. It will return the deleted Sandwichid.

6. Server A also handles the orders. We can add orders using the same endpoint URL with POST method http://localhost:8080/order/. It will return the newly created object type.

7. This endpoint with the method request GET http://localhost:8080/order/:orderId, will return the order details specific to an order id in JSON format.

8. The same endpoint URL http://localhost:8080/order with GET method, will return the list of order objects in an array format.

9. It also uses the MongoDB database to store new sandwiches, as well as retrieve details of the sandwiches from the database to show it at UI.

10. It uses two Rabbitmq channels: order generation and order completion to communicate with Server B. Order generation takes care of the order in the process from Server A to Server B. Order completion takes care of the order that is completed and sent from Server B to Server A.

More information about Server A is present in README.md file present in the directory of server A.

## RabbitMQ

RabbitMQ is a message brokering service and it is used to provide asynchronous communication between serve-a and server-b. These tasks are handled in the _rabbit-utils_ directory.In this project, rabbitmq image `rabbitmq:3-management-alpine` is used and all the required configurations are present in the root directory of `docker-compose.yml` file.

## MongoDb

In this project, MongoDb image is used in docker-compose.yml file. MongoDb runs in docker on port: 27017. Server A saves the sandwich as well as the orders in mongodb for persistence purposes.

## Server B

Server B runs on _node.js_ and uses libraries _express_ and _amqplib_ and these dependecies are defined in the _package.json_ file. Server B temporarily keeps the detail of orders in memory until 10 seconds have elapsed. It tracks the order generation as well as completion. Whenever Server A generates some orders, Server B consumes that for processing. When the consumption, as well as processing, are done, it sends a signal using rabbitmq message channels about the completion and order is shown completed.

### Structure of Server B

Server B is dockerized just like other parts of application. In server B, _rabbit-utils_ is for sending and receiving order in the queues of RabbitMq and preparation of order is performed in the _app_ directory.

The server B doesn't follow any patterns particularly, it has only extended the given files by adding:

- separating action to `app/prepareOrder.js` allows extensibility if `doWork` -function in `rabbit-utils` is changed.
- application (ports, hosts etc...) configuration is put to `settings.js`. The `enums.js` is a file to keep constants like in frontend, ideally with a file watcher that would synchronize them.
