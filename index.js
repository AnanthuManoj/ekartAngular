require('dotenv').config()

const express = require('express')

const cors = require('cors')

require('./DataBase/dbConnect')

const routes = require('./Routing/router')

const flipMartServer = express()

flipMartServer.use(cors())

flipMartServer.use(express.json())

flipMartServer.use(routes)

const PORT = 3002 || process.env.PORT

flipMartServer.listen(PORT,()=>{
    console.log('server is running in ',PORT);
})

flipMartServer.get('/',(req , res)=>{
    res.send('hello')
})