const express = require('express')
const router = express.Router()
const {showSignUp,doSignUp,loginPage,doLogin,getHomePage,detailedView,logout,createBlog,addBlogData} = require('../controllers/userControllers')
const userAuth = require('../middleware/userAuth')
// router.get('/', (req,res) =>{
//     res.send('gi this is ser page')
    
// })

// router.get('/', homePage)
router.get('/', loginPage)
router.get('/signUp', showSignUp)
router.post('/register', doSignUp)
router.post('/login', doLogin)
router.get('/home',userAuth, getHomePage)
router.get('/detailedView',userAuth, detailedView)
router.get('/logout', logout)
router.get('/createBlog', userAuth, createBlog)
router.post('/createBlog', userAuth, addBlogData)

module.exports = router