// const { request } = require("express")
const mongoose = require('mongoose')
const multer = require("multer")
const BLOGS = require('../models/blogSchema').blogs
const fs = require("fs")
const path =require("path")

const uploadPage = (req,res) =>{
    res.render('admin/upload.hbs')
}

const createBlog = (req,res) =>{
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
            images: req.files
        }).save().then((response) =>{
            res.redirect("/admin/uploads")
        })
    }
})
}

const homePage = (req,res) =>{
    BLOGS.find().then((response) =>{
        // console.log(response);
    
    res.render('admin/home.hbs', {data:response})
    })

}

const deletePost = (req,res) =>{
    console.log(req);
    BLOGS.findOne({_id:req.body.postId}).then((selectedFileData)=>{
        console.log(selectedFileData);

        BLOGS.deleteOne({_id:req.body.postId}).then((resp) =>{
            for(let i=0; i< selectedFileData.images.length; i++){
                const filePath = path.join(__dirname,'..','public/uploads',selectedFileData.images[i].filename)
                fs.unlink(filePath, (err)=>{
                    console.log(err);
                })
            }
        res.json({delete:true})

        }).catch(err=>{
            res.json({delete:false})
    })
    })
    
}

module.exports = {uploadPage,createBlog,homePage,deletePost}