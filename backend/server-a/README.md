# SERVER A

This directory contains code and documentation of server A. Server A runs on:

```
http://localhost:8080
```

# RABBITMQ

Server A uses two queue to communicate with Server B.

**orderGenerationQueue** : This queue contains the newly placed order to be sent from server-a to server-b for processing.

**orderCompletionQueue** : This queue contains orders processed by server-b to be sent to server-a

# ORDER ENDPOINTS

## GET ORDER BY ID

To get an order, make a **GET** request to `http://localhost:8080/order/:orderId`
where orderid is the id of the order you want. It will return an object of order type.

#### EXAMPLE

REQUEST: => `GET http://localhost:8080/order/606b2ffd4ad7ce001596aa21`

RESPONSE:

```json
{
  "sandwichIds": "606b2aa64ad7ce001596aa1c",
  "_id": "606b2ffd4ad7ce001596aa21",
  "status": "ready",
  "date": "2021-04-05T15:42:53.109Z"
}
```

## POST

To add an order, make a **POST** request to `http://localhost:8080/order/`
with an order object in the body of the request. It will return the newly created object of order type.

#### EXAMPLE

REQUEST: => `POST http://localhost:8080/order/`

REQUEST BODY

```json
{
  "sandwichIds": "606b2a684ad7ce001596aa1a",
  "status": "ordered"
}
```

RESPONSE:

```json
{
  "sandwichIds": "606b2a684ad7ce001596aa1a",
  "_id": "606b2f054ad7ce001596aa1e",
  "status": "ordered",
  "date": "2021-04-05T15:38:45.758Z"
}
```

## GET ALL ORDERS

To get all orders, make a **GET** request to `http://localhost:8080/order`
This will return an array of order objects and empty array if no orders are found.

#### EXAMPLE

REQUEST: => `GET http://localhost:8080/order`

RESPONSE:

```json
[
  {
    "sandwichIds": "606b2a684ad7ce001596aa1a",
    "_id": "606b2f054ad7ce001596aa1e",
    "status": "ready",
    "date": "2021-04-05T15:38:45.758Z"
  },
  {
    "sandwichIds": "606b2aa64ad7ce001596aa1c",
    "_id": "606b2ffd4ad7ce001596aa21",
    "status": "ready",
    "date": "2021-04-05T15:42:53.109Z"
  }
]
```

# SANDWICH ENDPOINTS

## POST

To add a sandwich, make a **POST** request to `http://localhost:8080/sandwich/` with a sandwich object in the body of the request. It will return the newly created sandwich object.

#### EXAMPLE

REQUEST: => `POST http://localhost:8080/sandwich/`

REQUEST BODY

```json
{
  "name": "my-super-sandwich",
  "toppings": [
    {
      "name": "cheese"
    }
  ],
  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```

RESPONSE:

```json
{
  "_id": "606b2a684ad7ce001596aa1a",
  "name": "my-super-sandwich",
  "toppings": [
    {
      "_id": "606b2a684ad7ce001596aa1b",
      "name": "cheese"
    }
  ],
  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```

## GET A SANDWICH

To get a sandwich, make a **GET** request to `http://localhost:8080/sandwich/:sandwichId` where orderid is the id of the sandwich you want. It will return an object of sandwich type.

#### EXAMPLE

REQUEST: => `GET http://localhost:8080/sandwich/606b2a684ad7ce001596aa1a`

RESPONSE:

```json
{
  "_id": "606b2a684ad7ce001596aa1a",
  "name": "my-super-sandwich",
  "toppings": [
    {
      "_id": "606b2a684ad7ce001596aa1b",
      "name": "cheese"
    }
  ],
  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```

## GET ALL SANDWICHES

To get all sandwiches, make a **GET** request to `http://localhost:8080/sandwich`. This will return an array of sandwich objects.

#### EXAMPLE

REQUEST: => `GET http://localhost:8080/sandwich`

RESPONSE:

```json
[
  {
    "_id": "606b2a684ad7ce001596aa1a",
    "name": "my-super-sandwich",
    "toppings": [
      {
        "_id": "606b2a684ad7ce001596aa1b",
        "name": "cheese"
      }
    ],
    "description": "string",
    "imageUrl": "string",
    "breadType": "oats"
  },
  {
    "_id": "606b2aa64ad7ce001596aa1c",
    "name": "boring-sandwich",
    "toppings": [
      {
        "_id": "606b2aa64ad7ce001596aa1d",
        "name": "becon"
      }
    ],
    "description": "string",
    "imageUrl": "string",
    "breadType": "wheat"
  }
]
```

## UPDATE A SANDWICH BY ID

To update a sandwich, make a **POST** request to `http://localhost:8080/sandwich/:sandwichId` with a sandwich Id you wish to modify and the modified sandwich object in the body of the request. It will return the update sandwich object.

#### EXAMPLE

REQUEST: => `POST http://localhost:8080/sandwich/606b2a684ad7ce001596aa1a`

REQUEST BODY

```json
{
  "name": "my-super-sandwich",
  "toppings": [
    {
      "name": "cheese"
    },
    {
      "name": "bacon"
    }
  ],
  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```

RESPONSE:

```json
{
  "_id": "606b2a684ad7ce001596aa1a",
  "name": "my-super-sandwich",
  "toppings": [
    {
      "_id": "606b2a684ad7ce001596aa1b",
      "name": "cheese"
    }
  ],

  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```

## DELETE A SANDWICH

To delete a sandwich, make a **DELETE** request to `http://localhost:8080/sandwich/:sandwichId` where orderid is the id of the sandwich you wish to delete. It will return the deleted sandwich object.

#### EXAMPLE

REQUEST: => `DELETE http://localhost:8080/sandwich/606b2a684ad7ce001596aa1a`

RESPONSE:

```json
{
  "_id": "606b2a684ad7ce001596aa1a",
  "name": "my-super-sandwich",
  "toppings": [
    {
      "_id": "606b31d74ad7ce001596aa24",
      "name": "cheese"
    },
    {
      "_id": "606b31d74ad7ce001596aa25",
      "name": "bacon"
    }
  ],

  "description": "string",
  "imageUrl": "string",
  "breadType": "oats"
}
```
