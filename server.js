require("dotenv").config();
const app = require("./src/app")
const connectToDB = require("./src/config/database")
connectToDB()
const authRouter = require("./src/routes/auth.routes")
app.listen(3000,()=>{
    console.log("server is running")
})
