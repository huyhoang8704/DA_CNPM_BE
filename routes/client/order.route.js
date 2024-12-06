const express = require('express')
const controller = require('../../Controllers/client/order.controller')
const paymentController = require('../../Controllers/client/payment.controller')
const router = express.Router() 

router.post('/',controller.createOrder)

router.post('/payment',paymentController.createPayment)

router.get('/payment/status/:paymentId',paymentController.checkPaymentStatus)

router.patch('/payment/status/success/:paymentId',paymentController.updatePaymentSuccess)

router.delete('/payment/cancelled/:paymentId',paymentController.cancelledPayment)

module.exports = router;