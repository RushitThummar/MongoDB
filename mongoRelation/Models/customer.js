// one to many relation/approach 2
const mongoose = require("mongoose");
const { Schema } = mongoose;
main()
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

//define child schema
const orderSchema = new Schema({
  item: String,
  price: Number,
});
//define parent schema
const customerSchema = new Schema({
  name: String,
  orders: [
    {
      //object id store for child object
      type: Schema.Types.ObjectId,
      //refrence come from which olace
      ref: "Order",
    },
  ],
});

//Handling Deletion
// //pre middleware
// customerSchema.pre("findOneAndDelete", async () => {
//   console.log("PRE MIDDLEWARE");
// });
//post middleware=>del customer orders
customerSchema.post("findOneAndDelete", async (customer) => {
  //customer.orders.length>0
  if (customer.orders.length) {
    //id inside ($in refer to the Customer.orders)
    let res = await Order.deleteMany({ _id: { $in: customer.orders } });
    console.log(res);
  }
});

//create child Model
const Order = mongoose.model("Order", orderSchema);
//creat parent model
const Customer = mongoose.model("Customer", customerSchema);

// const addCustomer = async () => {
//   let cust1 = new Customer({
//     name: "Jay",
//   });
//   let order1 = await Order.findOne({ item: "Chipw" });
//   let order2 = await Order.findOne({ item: "Choclate" });

//   //push full object data
//   cust1.orders.push(order1);
//   cust1.orders.push(order2);

//   let result = await cust1.save();
//   console.log(result);
// };
// addCustomer();

//find customer function
const findCustomer = async () => {
  //populate use for convert _id into Object-Info.
  let result = await Customer.find({}).populate("orders");
  //console.log(result[0]);
};
//findCustomer();

// const addOrders = async () => {
//   let res = await Order.insertMany([
//     { item: "Samosa", price: 15 },
//     { item: "Chipw", price: 10 },
//     { item: "Choclate", price: 10 },
//   ]);
//   console.log(res);
// };
// addOrders();

//addcustomer function
const addCust = async () => {
  let newCust = new Customer({
    name: "Harsh",
  });
  let newOrder = new Order({
    item: "Burger",
    price: 150,
  });

  newCust.orders.push(newOrder);

  await newOrder.save();
  await newCust.save();

  console.log("added new customer");
};
//addCust();

//delete customer finction
const delCust = async () => {
  let data = await Customer.findByIdAndDelete("67ebd722a16b9cc114f66ca5");
  console.log(data);
};
delCust();
