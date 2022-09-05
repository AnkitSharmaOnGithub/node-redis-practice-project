const bcrypt = require('bcryptjs');
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
  } catch (err) {
    console.error(`Error while getting users data`, err.message);
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { username, password, age } = req.body;

  // Try hashing the password
  

  try {
    if (username && password && age) {
      const response = await UserService.createUser(username, age);
      res.send(response);
    } else {
      const error = new Error(
        `Please provide the correct data for creating the user`
      );
      error.statusCode = "400";
      throw error;
    }
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
