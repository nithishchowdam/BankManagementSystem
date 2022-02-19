//create express app
const exp = require("express")
const app = exp();
const path=require("path")
require('dotenv').config()

//connecting angular with express server
app.use(exp.static(path.join(__dirname,"./dist/BankManagementSystem/")))

app.use(exp.json())
//import APIS
const userApi = require("./APIS/user-api.js")
const adminApi = require("./APIS/admin-api.js");




//execute specific api based on path
app.use("/user", userApi)
app.use("/admin", adminApi)
//invalid path
app.use((req, res, next) => {

    res.send({ message: `path ${req.url} is invalid` })
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})





//assign port
const port=process.env.PORT; 
app.listen(port, () => console.log(`server on ${port}...`))