import express from "express"
const app= express()
import multer from "multer";
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,`userprofile-${Date.now()}`)
    }
})

const upload=multer({storage:storage})

app.get("/upload",upload.single("image"),(req,res)=>{
    res.send("image uploaded");
})
app.post("/upload",(req,res)=>{
    res.send("image uploaded")
})
app.listen(3001,()=>{
    console.log("running");
})