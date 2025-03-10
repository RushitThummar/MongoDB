const mongoose = require('mongoose');

main().then((res)=>{
    console.log("connection sucessful");
})
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

//difine schema and validation
const booksSchema=new mongoose.Schema({
   title:{
    type:String,
    required:true,//not null
    maxLength:20,
   },
   author:{
    type:String,
   },
   price:{
    type:Number,
    min:[1,"please enter valid price"],
   },
   discount:{
    type:Number,
    default:0,
   },
   category:{
    type:String,
    enum:["fiction","non-fiction"],
   },
});

//define module
const Book =mongoose.model("Book",booksSchema);

//find by id nd update
Book.findByIdAndUpdate('67cebbdec62c93e96dc0bfd9',
    {price:1300},
    {runValidators:true}//upply schema onthis
).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err.errors.price.properties.message);//display our define message direct
});

// //insert data
// let book1=new Book({
//     title:"marvel comics",
//     price:1350,
//     category:"fiction",
// });

// //save book1
// book1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });