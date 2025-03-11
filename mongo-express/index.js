const express=require("express");
const app=express();
// getting-started.js
const mongoose = require('mongoose');
const path=require("path");
//require chat module
const Chat=require("./models/chat.js");
const methodOverride=require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
//parse the dat come with form useable
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connection succesful");
}).catch((err) =>{ 
    console.log(err)}
);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();//find allchat from db
    //console.log(chats);
    res.render("index.ejs",{chats});
});

//new route rander form
app.get("/chats/new",(req,res)=>{
   res.render("new.ejs"); 
});

//create route for send form
app.post("/chats",(req,res)=>{
    let {from , msg , to}=req.body;
    let newChat=new Chat({
        from:from,
        msg:msg,
        to:to,
        created_at:new Date(),
    })
    newChat.save()
    .then((res)=>{console.log("chat was save")})//when we use .then not need to write await
    .catch((err)=>{console.log(err)});

    res.redirect("/chats");
});

//edit msg route
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat=await Chat.findById(id);//find is asyncro
    res.render("edit.ejs",{chat});
});

//update Route
app.put("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let{msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );

    console.log(updatedChat);
    res.redirect("/chats");
});

//delete rout
app.delete("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let deletedChat=await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
    res.send("root is working");
});

app.listen(8080,()=>{
    console.log("server is listining on port 8080");
});