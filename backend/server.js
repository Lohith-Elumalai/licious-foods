const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./config/dbConn')
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json())
const cors = require('cors')
app.use(cors())
app.use("/image", express.static('uploads'))

connectDB();

//routes
//api endpoints
app.use("/api/food", require("./routes/foodRouter"))
app.use("/api/user", require("./routes/userRouter"))
app.use("/api/cart", require("./routes/cartRouter"))
app.use("/api/order", require("./routes/orderRouter"))





app.get("/", (req, res) => {
    res.send("API working")
})


app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
})