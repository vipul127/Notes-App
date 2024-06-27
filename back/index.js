require("dotenv").config()

const config=require("./config.json")
const mongoose=require("mongoose")

mongoose.connect(process.env.CONNECTION_STRING)

const User=require("./models/user.model")
const Note= require("./models/note.model")

const express = require("express")
const cors = require("cors")
const app = express()


const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utilities");

app.use(express.json())
app.use(
    cors({
        origin: '*',

    })
)

//account creation 
app.post("/create-account", async(req,res) => {
    const {fullName, email, password}=req.body
    if(!fullName){
        return res
            .status(400).json({error: true, message: "Please enter Full Name... "})
    }
    if(!email){
        return res
            .status(400).json({error: true, message: "Please enter Email..."})
    }
    if(!password){
        return res
            .status(400).json({error: true, message: "Please enter password..."})
    }


    const isUser = await User.findOne({email: email});

    if(isUser){
        return res.json({
            error: true,
            message: "A user with this email already exist!"
        })
    }
    const user= new User({
        fullName, 
        email,
        password,
    })

    await user.save()

    const accessToken = jwt.sign({
        user}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "36000m"
        })

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Registeration Successful"
        }) 
})
//Login
app.post("/login", async(req, res) => {
    const{email,password}=req.body
    if(!email){
        return res
            .status(400).json({message: "Please enter Email..."})
    }
    if(!password){
        return res
            .status(400).json({message: "Please enter password..."})
    }

    const userInfo= await User.findOne({email:email})
    if(!userInfo){
        return res.status(400).json({message: "User not found"})
    }
    if(userInfo.email==email && userInfo.password==password){
        const user = {user: userInfo}
        const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn:"36000m"})
        return res.json({
            error: false,
            message: "Login Sucessful",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error: true,
            message: "Bad Credentials",
        })
    }
})
//Adding notes
app.post("/add-note", authenticateToken , async(req,res)=>{
    const {title, content, tags} =req.body;
    const {user} = req.user;

    if(!title){
        return res.status(400).json({error: true, message: "Title is required! "})
    }
    if(!content){
        return res.status(400).json({error: true, message: "Content is Empty! "})
    }
    
    try{
        const note= new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id
        })
        await note.save()

        return res.json({
            error: false,
            note,
            message: "Note Added!"
        })
    } catch (error){
        return res.status(500).json({
            error:true,
            message:"Internal server error"
        })
    }

})


app.listen(8000)
module.exports=app;