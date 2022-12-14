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
    const result = await UserService.getUser(userId);

    if (result.length > 0) {
      return res.send({
        username: result[0],
        age: result[1],
      });
    } else {
      throw new Error("Sorry! We could not find any data for this user");
    }
  } catch (err) {
    console.error(`Error while getting users data`, err.message);
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { username, password, age } = req.body;
  const fields = ["username", "password", "age"];
  let error = null;

  try {
    // Add validations check for the fields
    for (let field of fields) {
      if (!req.body[field]) {
        error = new Error(
          `Please provide the value for the following field :- ${field}.`
        );
        error.statusCode = "400";
        throw error;
      }
    }

    if (username && password && age) {
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

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { userId } = req.params;

    // Add validations check
    ["username", "password"].forEach((el) => {
      if (!req.body[el]) {
        const error = new Error(
          `Please provide the value for the following field :- ${field}.`
        );
        error.statusCode = "400";
        throw error;
      }
    });

    // Send the login call to the userService
    const user_data = await UserService.login(userId, username, password);

    // Check if the username is same. Using custom logic, this can also be sorted via Redis.
    if (user_data.username == username) {
      // Compare if the password is correct.
      const loginStatus = await bcrypt.compare(password, user_data.password);

      // TODO: Can implement sessions and validations. But, due to shortage of time, will do it in future. 
      if (loginStatus) {
        res.send({
          message: "Login Successful",
        });
      } else {
        throw new Error(
          "Login failed! Please check your login credentials and enter again."
        );
      }
    }
    // Check for the response and throw error, if any.
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
