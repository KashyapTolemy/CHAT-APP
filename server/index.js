const express =require("express")
const cors =require("cors")
const mongoose =require("mongoose")
const userRoutes =require('./routes/userRoutes')
const messagesRoutes =require('./routes/messagesRoutes')

const app =express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)
app.use("/api/messages",messagesRoutes)

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL) 
        console.log("DB connected successfully")
    }
    catch(err) {
        console.log(err.message)
    }
}

connectToMongo()

const server =app.listen(process.env.PORT,()=>{
    console.log(`Server running on PORT ${process.env.PORT}`)
})