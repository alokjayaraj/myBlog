const express = require('express')
const router = express.Router()
const {uploadPage,createBlog,homePage,deletePost} = require('../controllers/adminControllers')

router.get('/', homePage)
router.get('/uploads', uploadPage)
router.post('/createBlog', createBlog)
router.delete('/deletePost', deletePost)

module.exports = router