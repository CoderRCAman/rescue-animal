const router = require('express').Router() 

const {Post} = require('../controllers/PostCtrl')
const {auth} = require('../middleware/auth')

router.post('/post' ,auth ,  Post )


module.exports = router