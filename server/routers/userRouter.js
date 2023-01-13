const router = require('express').Router()
const userCtrl =require('../controllers/userCtrl')

const {auth} = require('../middleware/auth')






// router.get('/logout',userCtrl.logout) 

router.post('/register', userCtrl.register)

router.post('/login', userCtrl.login)

router.get('/logout',userCtrl.logout) 

router.get('/all_infor',auth, userCtrl.getUsersAllInfor)

router.get('/infor', userCtrl.getUser)

router.patch('/update/:id',userCtrl.updateUser)

module.exports = router