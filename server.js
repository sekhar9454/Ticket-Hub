const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.static( 'A:\Delta\Ticket Hub\Public\home'));

const UserRoute =  require("./routes/user");
const HomeRoute = require("./routes/home");

app.use("/user" , UserRoute);
app.use("/home", HomeRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});