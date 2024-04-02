require("dotenv").config()
require("./database/config/database")
const express = require("express")
const bodyParser = require("body-parser") 
const app = express()
const cors = require("cors") 
const PORT = process.env.PORT || 3000
const taskRoute = require("./routes/tasks")
const userRoute = require("./routes/users")
const session = require("express-session")
const store = require("./database/SessionStorage/sessions")
const nodemailer = require("nodemailer")


// create session in the server
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:1200000 //20 mins 
    }
}))

app.use(bodyParser.json());
app.use(cors());

// endpoints from routes directory
app.use("/task", taskRoute)
app.use("/user", userRoute)


// nodemailer

const transporter = nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'kellytoroitich89@gmail.com',
        pass:process.env.EMAIL_PASS
    }
})

const mailOptions = {
    from:'kellytoroitich89@gmail.com',
    to:'kellytoroitich89@gmail.com',
    subject:'Test Email',
    text:'This is a test email from Node.js using Nodemailer.'
}

// send email
transporter.sendMail(mailOptions, (error, info)=>{
    if (error){
        console.error("Error sending email:", error)
    }else{
        console.log('Email sent:', info.response)
    }
})
app.get("/email", (req,res)=>{
    transporter.sendMail(mailOptions, (error, info)=>{
        if (error){
            res.status(400).json({message:"Error sending email"})
            console.error("Error sending email:", error)
        }else{
            res.status(200).json({message:"Email sent"})
            console.log('Email sent:', info.response)
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

module.exports = app
