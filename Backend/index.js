const connnectToMongo=require('./db');
const express =require('express')
var cors=require('cors')

connnectToMongo();
const app=express();
const port = 5000
var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(express.json())

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{
    console.log(`Hello Mongo : ${port}`)
})
