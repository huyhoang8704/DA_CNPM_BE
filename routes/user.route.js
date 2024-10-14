const express = require('express')
const controller = require('../controller/user.controller')


const router = express.Router()

router.get('/list', controller.getUsers)

router.get('/detail/:id' , controller.getUser)

router.patch('/edit/:id' , controller.updateUser)

router.post('/register' , controller.register)

router.post('/login' , controller.login)

module.exports = router;