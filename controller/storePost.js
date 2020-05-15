const BlogPost = require("../models/BlogPost")
const path = require('path')
module.exports = (req,res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname,"../public/upload",image.name), (err)=>{

        BlogPost.create({title: req.body.title,body: req.body.body , image:"/upload/"+image.name},(error,blogpost)=>{
           
            res.redirect("/")
        })
    })
}