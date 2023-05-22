const express =require("express")
const cors =require("cors")
const mongoose =require("mongoose")

const app =express()
require("dotenv").config()

app.use(cors())
app.use(express.json())

// const connectToMongo = () => {
//     mongoose.connect(process.env.MONGO_URL, () => {
//       console.log("Connected to Mongo Successfully!");
//     });
//   };
// connectToMongo()
// mongoose.connect(process.env.MONGO_URL,()=>{
//     useNewUrlParser=true,
//     useUnifiedTopology=true
// }).then(()=>{
//     console.log("DB connected successfully")
// }).catch((err)=>{
//     console.log(err.message)
// })
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