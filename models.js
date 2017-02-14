let detail = {
    "label": String,
    "price": Number
}

let food = {
    "id": Number,
    "name": String,
    "price": Number,
    "details": [detail]
}

let status = {
    "waiting": 0,
    "ongoing": 1,
    "ready": 2
}

let order = {
    "table": Number,
    "foods": [food],
    "orderNumber": Number,
    "price": Number,
    "createdAt": Date,
    "status": status
}

