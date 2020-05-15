const mongoose = require('mongoose')
const BlogPost = require("./models/BlogPost")
mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser:true})
BlogPost.create({
    title:"đây là test title",
    body: "đây là my test db"
},(error,blogpost)=>{
    console.log(error,blogpost)
})