const express=require('express');

const router=express.Router();
const Task=require('../model/task');


router.get('/',(req,res)=>{
res.send("reached v1");
});
//getting all
router.get('/tasks',async(req,res)=>{
    try{
        const task=await Task.find()
        res.status(200).json(task);
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
    });

//getting one
router.get('/tasks/:id',getTask,(req,res)=>{
res.status(200).json(res.task);
})


//post one
router.post('/tasks',async(req,res)=>{
const task=new Task({
    title:req.body.title,
    completed:req.body.completed
})
try{
    const newTask=await task.save();
    res.status(201).json(newTask);
}
catch(err){
    res.status(400).json({message:err.message})
}
})





//update one
router.put('/tasks/:id',getTask,async (req,res)=>{


    if(req.body.completed!=null ){
        res.task.completed=req.body.completed;   
    }
    if(req.body.title!=null){
        res.task.title=req.body.title;
    }


    try{
        const updatedTask=await res.task.save();
        res.json({message:"task updated successfully"})
      
        
    }
    catch(err){
        res.status(400).json({message:"no task with this id"})
    }

});


//delete one
router.delete('/tasks/:id',getTask,async (req,res)=>{
try{
await res.task.remove()
res.json(204).json({message:"deleted task"})
}
catch(err){
res.status(500).json({message:err.message})
}
});


async function getTask(req,res,next){

    let task
try{
    task=await Task.findById(req.params.id);
    if(task==null){
        return res.status(404).json({message:"task not found"});
    }
}
    catch(err){
        return res.status(500).json({message:err.message});
    }

    res.task=task;
    next()
}


module.exports=router;