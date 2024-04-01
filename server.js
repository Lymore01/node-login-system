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



app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

module.exports = app
