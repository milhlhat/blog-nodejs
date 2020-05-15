const BlogPost = require("../models/BlogPost")
module.exports= (req,res)=>{
    BlogPost.findById(req.params.id, (error,detailPost)=>{
    //    console.log(detailPost)
        res.render('detailPost',{
            detailPost 
        })

    })
}