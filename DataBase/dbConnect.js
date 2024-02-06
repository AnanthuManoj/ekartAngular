const mongoose = require('mongoose')

const connectionString = process.env.DataBase

mongoose.connect(connectionString).then((result)=>{
    console.log("connected to the database")
}).catch((err)=>{
    console.log("could not connect to the database", err)
})