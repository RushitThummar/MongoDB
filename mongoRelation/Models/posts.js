// one to squllions relation/approach 2
const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//define parent schema
const userSchema = new Schema({
  username: String,
  email: String,
});

//define child schema
const postSchema = new Schema({
  content: String,
  likes: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
//   //   let user1 = new User({
//   //     username: "jay",
//   //     email: "jay@gmail.com",
//   //   });
//   let user = await User.findOne({ username: "jay" });
//   //   let post1 = new Post({
//   //     content: "Hello World!",
//   //     likes: 7,
//   //   });
//   //   post1.user = user1;
//   let post2 = new Post({
//     content: "Bye Bye :)",
//     likes: 23,
//   });
//   //post1.user = user1;
//   post2.user = user;
//   await post2.save();
//   //   await user1.save();
//   //   await post1.save();
// };
// addData();

const getData = async () => {
  let result = await Post.findOne({}).populate("user", "username");
  console.log(result);
};
getData();

// //delete function
// const del = async () => {
//   await Post.findByIdAndDelete("67eb826fd6a08efc0dcb645d");
//   await User.findByIdAndDelete("67eb804b9a0df97dc1243509");
// };
// del();
