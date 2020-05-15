const user = require("../models/User")

module.exports = (req,res)=>{
    user.create(req.body,(error,u)=>{
       if(error){
           console.log(error)
           return res.redirect("/auth/register")
       }
        res.redirect("/")
    }
    )
}
