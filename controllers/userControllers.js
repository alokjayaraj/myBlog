const {response} = require('express')
const mongoose = require('mongoose')
const USER = require('../models/usersModel').users
const BLOGS = require('../models/blogSchema').blogs
const jwt = require('jsonwebtoken');
const multer = require('multer')
// const homePage = ((req,res) =>{
//     res.render('user/home.hbs')
// })

const loginPage = ((req,res) =>{
    // res.render('user/login.hbs')
    if(req.cookies.userJwt){
        res.redirect('/home')
    }else{
    res.render('user/login.hbs')

    }
})

const showSignUp = ((req,res) =>{
    res.render('user/signUp.hbs')
})

const doSignUp = async(req,res) =>{
    console.log(req.body);
    try{
        const UserExist = await USER.findOne({email:req.body.email})
        if(UserExist)
        {
            return res.json({signup:false})
        }else{
            USER({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password
            }).save().then((resp) =>{
                res.json({signup:true});
            }).catch(() =>{
                res.json({signup:false})
            });
        } 
    }catch(error){
        res.json({error:"something went wrong"})
    }
    
};

const doLogin = ((req,res) =>{
    // console.log(req.body)
    USER.find({
        email: req.body.email,
        password: req.body.password
    }).then((response) =>{
        // console.log(response);
        if(response.length > 0){
        const token =jwt.sign({userID:response[0]._id}, "secretkey",{expiresIn:'2d'} )    
            res.cookie('userJwt',token,{
                httpOnly:true,
                samSite: 'lax',
                secure: false,
                maxAge: 24*60*60*1000
            })
            res.status(200).json({login:true})
        }else{
            res.json({login:false})
        }
    })

})

const getHomePage = (req,res) =>{
    BLOGS.find().then((response) =>{
        // console.log(response);
    
    res.render('user/home.hbs', {data:response})
    })
}

const detailedView = (req,res) =>{
    // res.render('user/detailedView.hbs')
    BLOGS.find({_id:req.query.id}).populate({
        path:"createdBy",
        select:['name','email']}).then(response =>{
        console.log(response);
        res.render("user/detailedView.hbs", {data:response[0]})
    })
}

const logout = (req,res) =>{
    res.cookie('userJwt',null,{
        httpOnly:true,
        samSite: 'lax',
        secure: false,
        maxAge: 1
    })
    req.cookies.userJwt = null;
    res.redirect('/')
}

const createBlog = (req,res) =>{
    res.render('user/upload.hbs')
}

const addBlogData = (req,res) =>{
    const fileStorage = multer.diskStorage({
        destination: (req,file,cb) =>{
            cb(null,"public/uploads")
        },
            // cb-callback, u can use any name files or file,cb are all random names
        filename: (req,files,cb) =>{
            cb(null,Date.now()+ "-" + files.originalname);
        }
    });
    
    const upload = multer({storage:fileStorage}).array('images', 5)
    //  images is the name="" used in upload, 4 is max number of images that can be selected
    
    upload(req,res,(err) =>{
        if(err){
        console.log("File upload error");
        }else{
            // console.log(req.files);
            BLOGS({
                heading: req.body.title,
                content: req.body.content,
                createdBy: req.query.id,
                images: req.files
            }).save().then((response) =>{
                res.redirect("/home");
            })
        }
    })
}

module.exports = {doSignUp,loginPage,doLogin,getHomePage,showSignUp,detailedView,logout,createBlog,addBlogData}