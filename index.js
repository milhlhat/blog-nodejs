const express = require('express')
const app = express()
const path = require('path') // read file
const ejs = require('ejs')
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const fileUpload = require("express-fileupload")
app.use(fileUpload())

const expressSession = require("express-session")
app.use(expressSession({
    secret: "key dog "
}))

const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://sa:sa12345678@cluster0-9zql4.mongodb.net/blog?retryWrites=true&w=majority")
const BlogPost = require("./models/BlogPost.js")

app.set("view engine", "ejs")
app.use(express.static('public'))

const validateMiddleWare = require("./middleware/validationMiddleware")
app.use('/posts/store', validateMiddleWare)

const authMiddleware = require("./middleware/authMiddleware")

const redirectAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticatedMiddleware")


app.listen(4000, () => {
    console.log('APP LISTEN ON PORT 4000')
})

//------------------
global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

const homeController = require("./controller/home")
app.get("/", homeController)


app.get("/about", (req, res) => {
    res.render('about')
})

app.get("/contact", (req, res) => {
    res.render('contact')
})

app.get("/post", (req, res) => {
    res.render('post')
})


const getPostController = require("./controller/getPost")
app.get("/post/:id", getPostController)


const newPostController = require("./controller/newPost")


app.get("/posts/new", authMiddleware, newPostController)


const storePostController = require("./controller/storePost")
app.post("/posts/store", authMiddleware, storePostController)


const newUserController = require("./controller/newUser")
app.get("/auth/register", redirectAuthenticatedMiddleware, newUserController)

const storeUserController = require("./controller/storeUser")
app.post("/users/register", redirectAuthenticatedMiddleware, storeUserController)

const loginController = require("./controller/login")
app.get("/auth/login", redirectAuthenticatedMiddleware, loginController)

const loginUserController = require("./controller/loginUser")
app.post("/users/login", redirectAuthenticatedMiddleware, loginUserController)

const logoutController = require("./controller/logout")
app.get("/auth/logout",logoutController)

app.use((req,res)=> res.render("notFound"))
