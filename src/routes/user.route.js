const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// Temporary functions to keep track of user count in redis
router.get('/redis_user_count', userController.getCurrentRedisCount);
router.post('/redis_user_count', userController.incrementRedisCount);

// ###### Temporary routes to keep track of user count in redis

// Get current redis counter
router.get("/getCurrentRedisCount", userController.getCurrentRedisCount);

router.get("/setRedisCount", userController.setRedisCount);

router.get("/incrementRedisCount", userController.incrementRedisCount);

// Get the users data
router.get("/", userController.getUsers);

// Get a single user
router.get("/:id", userController.getUser);

// Create a user
router.post('/', userController.createUser);

module.exports = router;
