const express=require('express');
const app=express();
const mongoose = require('mongoose');
require('dotenv/config');



mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
const db=mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=> console.log('connected to database'))




app.use(express.json())

const tasksRoutes=require('./routes/task.js');
app.use('/v1',tasksRoutes);


app.listen(3000,()=>{
    console.log('server is running on port 3000');
}
);