const mongoose = require('mongoose');

main().then((res)=>{
    console.log("connection sucessful");
})
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
// use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//difine schema
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number
});

//define models
const User=mongoose.model("User",userSchema);

//delete by id and find
User.findByIdAndDelete('67ce7632245a91333c5c630f').then((res)=>{
  console.log(res);
});
// //delete one
// User.deleteOne({name:"adam"}).then((res)=>{
//   console.log(res);
// });
// //delete many
// User.deleteMany({age:{$gt:18f}}).then((res)=>{
//   console.log(res);
// });

// //findby id and update
// User.findByIdAndUpdate('67ce77ed0facb708517ba6b9',{age:20},{new:true}).then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// //update and show
// User.findOneAndUpdate({name:"shree"},{age:20},{new:true}).then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// //update many
// User.updateMany({age:{$gt:18}},{age:19}).then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });
// //update one
// User.updateOne({name:"shree"},{age:19}).then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// //find all 
// User.find({age:{$gt:18}}).then((res)=>{
//     console.log(res[0].name);
// })
// .catch((err)=>{
//     console.log(err);
// });
 
// //find one based on id
// User.findOne({_id:'67ce77ed0facb708517ba6b9'}).then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });

// //inserting one
// const user1=new User({
//     name:"adam",
//     email:"adam@gmail.com",
//     age:18
// });

// user1.save();

// const user2=new User({
//     name:"eve",
//     email:"eve@gmail.com",
//     age:17
// });

// user2.save().then((res)=>{console.log(res);})
//              .catch((err)=>{console.log(err);})

// //(inserot many data)
// User.insertMany([
//     {name:"jay",email:"jay@gmail.com",age:20},
//     {name:"shree",email:"shree@gmail.com",age:25},
//     {name:"krishna",email:"krishna@gmail.com",age:16}
// ]).then((res)=>{console.log(res);});