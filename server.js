const app = require("./src/app")
const connectToDB = require("./src/config/database")
require("dotenv").config();
connectToDB()
const authRouter = require("./src/routes/auth.routes")
app.listen(3000,()=>{
    console.log("server is running")
})
