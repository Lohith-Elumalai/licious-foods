const express = require('express')
const {placeOrder, verifyOrder, userOrders, listOrders, updateStatus} = require('../controllers/orderController')
const authMiddleware = require('../middlewares/auth')
const orderRouter = express.Router()


orderRouter.post('/place',authMiddleware, placeOrder)
orderRouter.get('/userorders',authMiddleware, userOrders)
orderRouter.post("/verify", verifyOrder)
orderRouter.get('/list', listOrders)
orderRouter.post('/status', updateStatus)

module.exports = orderRouter