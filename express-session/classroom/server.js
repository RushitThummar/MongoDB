const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

//set view path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
  secret: "mysupersecretstring",
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

//use res.local middleware to send msg to page.ejs
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  res.locals.errMsg = req.flash("error");
  next();
});

//storing info
//send name as a string form /register?name=rushit and abstract from query
app.get("/register", (req, res) => {
  let { name = "anonymous" } = req.query;
  req.session.name = name;
  // //save cookie inside session
  //console.log(req.session);
  //flash(key,msg)
  if (name === "anonymous") {
    req.flash("error", "user not registered");
  } else {
    req.flash("success", "user registered sucessful!");
  }
  res.redirect("/hello");
});

//using info
app.get("/hello", (req, res) => {
  res.render("page.ejs", { name: req.session.name });
});

// //count: how many time session use
// app.get("/reqcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }

//   res.send(`you sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res) => {
//   res.send("test successful!");
// });

app.listen(3000, () => {
  console.log("listining on port 3000");
});
