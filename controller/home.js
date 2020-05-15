const BlogPost = require("../models/BlogPost")
module.exports= (req,res)=>{
    BlogPost.find({},(error,posts)=>{
        // console.log(posts)
        console.log(req.session)
        res.render('index',{
            blogposts : posts
        })
    })
}
