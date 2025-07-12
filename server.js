const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.static( 'A:\Delta\Ticket Hub\Public\home'));


app.set("view engine" , "ejs");
app.set('views', './views');

const UserRoute =  require("./routes/user");
const HomeRoute = require("./routes/home");
const Userlogin = require("./routes/Userlogin");
const UserSignup = require("./routes/UserSignup");
const UserResetPass = require("./routes/ForgetPass");

app.use("/user" , UserRoute);
app.use("/home", HomeRoute);
app.use("/login" , Userlogin);
app.use("/Signup" , UserSignup);
app.use("/forgetPass" , UserResetPass);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});