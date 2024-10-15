const express = require('express')
const controller = require('../../Controllers/admin/dish.controller')
const router = express.Router()


// router.get('/',controller.index)
// router.patch('/change-status/:status/:id',controller.changeStatus)
// router.delete('/delete/:id',controller.deleteItem)
// // create
// router.get('/create',controller.create)
// router.post('/create',controller.createPOST)


// // create
// router.get('/create',controller.create)
// router.post('/create',controller.createPOST)
// // edit
// router.get('/edit/:id',controller.edit)
// router.patch('/edit/:id',controller.editPatch)
// //detail
// router.get('/detail/:id',controller.detail)


router.get('/detail/:name', controller.getDish),
    
router.get('/list', controller.getDishes),
    
router.patch('/edit/:name', controller.updateDish),
    
router.post('/add', controller.addDish),

module.exports = router;