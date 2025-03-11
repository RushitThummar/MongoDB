const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

main().then(()=>{
    console.log("connection succesful");
}).catch((err) =>{ 
    console.log(err)}
);

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//chats array
let allchats=[
    {
        from:"neha",
        to:"priya",
        msg:"send me your exam sheet",
        //date() function created date bydefault in js
        created_at:new Date(),
    },
    {
        from:"jay",
        to:"rushit",
        msg:"you can come yesterday!",
        created_at:new Date(),
    },
    {
        from:"rushit",
        to:"harsh",
        msg:"send me your vagha",
        created_at:new Date(),
    },
    {
        from:"harsh",
        to:"shubham",
        msg:"ehere are you coming?",
        created_at:new Date(),
    },
    {
        from:"hitesh",
        to:"rushi",
        msg:"jay Swaminarayan",
        created_at:new Date(),
    },
    
];

//insert manychats
Chat.insertMany(allchats);
