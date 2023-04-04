const router = require('express').Router() 

const {Post} = require('../controllers/PostCtrl')
const{getPost} = require('../controllers/PostCtrl')
const {auth} = require('../middleware/auth')

router.post('/post' ,  Post )
router.get('/get' ,  getPost )


module.exports = router