// one to few relation/approach 1
const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//define schema
const userSchema = new Schema({
  username: String,
  addresses: [
    {
      _id: false, //no individual id made for addresaaes by mongodb
      location: String,
      city: String,
    },
  ],
});

//create Model
const User = mongoose.model("User", userSchema);
const addUsers = async () => {
  let user1 = new User({
    username: "Sherlockholmes",
    addresses: [
      {
        location: "221B Baker Street",
        city: "London",
      },
    ],
  });
  user1.addresses.push({ location: "P32 WallStreet", city: "London" });
  let result = await user1.save();
  console.log(result);
};

addUsers();
