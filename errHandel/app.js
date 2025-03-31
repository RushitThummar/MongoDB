const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// // makebasic middle ware ->res send
// app.use((req, res, next)=>{
//     // //if we print query of path ex. lh:8080/random?query=abcd
//     // let {query}=req.query;
//     // console.log(query);
//     console.log("i am middleware 1");
//     next();
// });
// app.use((req, res, next)=>{
//     console.log("i am middleware 2");
//     next();
// });

// //make logger mid-ware(morgan)
// app.use((req, res, next)=>{
//     req.responseTime=new Date(Date.now()).toString();
//     console.log(req.method,req.path,req.responseTime,req.hostname);
//     next();
// });

// //middleware only for random
// app.use("/random",(req, res, next)=>{
//     console.log("I am only for random");
//     next();
// });

//make mid-ware function to use api authontication
const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    //for http://localhost:8080/api?token=giveaccess
    next();
  }
  throw new ExpressError(401, "ACESS DINED!");
};
app.get("/api", checkToken, (req, res) => {
  res.send("api data");
});

app.get("/", (req, res) => {
  res.send(" hi! i am root");
});

app.get("/random", (req, res) => {
  res.send("genrate random page");
});

//example error code
app.get("/err", (req, res) => {
  abcd = abcd;
});

app.use("/admin", (req, res) => {
  throw new ExpressError(403, "Acess to admin is forbidden");
});
//custom error (remove author info)
app.use((err, req, res, next) => {
  //   console.log("--------ERROR--------");
  //give default value to status&msg
  let { status = 500, msg = "some error occured" } = err;
  res.status(status).send(msg);
  //   next(err);call error handling mid-ware
});

// //only for 404
// app.use((req, res) => {
//   res.status(404).send("page is not found");
// });

//listening port
app.listen(8080, () => {
  console.log("listning on port no. 8080");
});
