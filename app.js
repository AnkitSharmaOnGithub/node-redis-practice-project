const express = require("express");
const dotenv = require("dotenv");

// 3rd party modules
const env = dotenv.config({ path: "./src/configs/.env" });
const app = express();
const bodyParser = require('body-parser');

// Internal Imports
const userRoutes = require("./src/routes/user.route");


app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use("/users", userRoutes);

app.use((error,req,res,next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
})

app.listen(process.env.PORT, () =>
  console.log(`Server is listening for requests at port ${process.env.PORT}`)
);
