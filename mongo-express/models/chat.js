const mongoose = require('mongoose');

//define schema
const chatSchema=new mongoose.Schema({
  from:{
    type:String,
    required:true,
  },
  to:{
    type:String,
    required:true,
  },
  msg:{
    type:String,
    maxLength:50,
  },
  created_at:{
    type:Date,
    required:true,
  }
});

//model create//whatsapp collection name bydefault-chats
const Chat=mongoose.model("Chat",chatSchema);

//export module
module.exports=Chat;