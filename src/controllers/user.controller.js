const bcrypt = require("bcryptjs");
const UserService = require("../services/user.service.js");

exports.getUsers = async (req, res, next) => {
  try {
    const usersData = UserService.getUsers();
    res.send(usersData);
  } catch (err) {
    console.error(`Error while getting users data`, err.message);
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await UserService.getUser(userId);
  } catch (err) {
    console.error(`Error while getting users data`, err.message);
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { username, password, age } = req.body;
  console.log(username, password, age);
  const fields = ['username','password','age'];
  let error = null;

  try {
    // Add validations check for the fields
    for(let field of fields){
      console.log(req.body[field]);
      if(!field){
        error = new Error(
          `Please provide the value for the ${field}.`
        );
        error.statusCode = "400";
        throw error;
      }
    }

    if (username && password && age) {
      // Try hashing the password
      const hashedPassword = await bcrypt.hash(
        password,
        process.env.HASHING_SALT
      );
      const response = await UserService.createUser(
        username,
        hashedPassword,
        age
      );
      res.send(response);
    } 
    // else {
    //   const error = new Error(
    //     `Please provide the correct data for creating the user`
    //   );
    //   error.statusCode = "400";
    //   throw error;
    // }
  } catch (error) {
    return next(error);
  }
};

// Temporary functions to keep track of user count in redis
exports.getCurrentRedisCount = async function (req, res, next) {
  try {
    const user_count = await UserService.getCurrentRedisCount();
    return res.send(user_count);
  } catch (error) {
    console.log("44");
    console.log(error);
    return next(error);
  }
};

exports.setRedisCount = async function (req, res, next) {
  try {
    const data = await UserService.setRedisCount();
    res.send(data);
  } catch (error) {
    return next(error);
  }
};

exports.incrementRedisCount = async function (req, res, next) {
  try {
    const data = await UserService.incrementRedisCount();
    console.log(data);
    res.status(200).sendStatus(data);
  } catch (error) {
    return next(error);
  }
};
