const { v4: uuidv4 } = require("uuid");
const redisClient = require("../models/redis.model");
const keyHelper = require("../helpers/key.helper");

exports.getUsers = () => {
  // TODO - Write code for fetching data from redis
  return 'Users data code needs to be written';
};

exports.createUser = async (username, hashedPassword, age) => {
  try {
    const uuid = uuidv4();
    return Promise.all([
        redisClient.hSet(keyHelper.generateKey("users", uuid), username, username),
        redisClient.hSet(keyHelper.generateKey("users", uuid), age, age),
        redisClient.hSet(keyHelper.generateKey("users", uuid), password, hashedPassword)
    ]);
  } catch (err) {
    // console.log(`Start error logging....`);
    // console.log(err);
    // console.log(`End error logging....`);
    return err;
  }
};


// Temporary functions to keep track of user count in redis
exports.getCurrentRedisCount = async () => {
        const user_count = await redisClient.get('user_redis_count');
        if(!user_count){
          throw new Error(`No key-value pair exists for the provided key ${'user_redis_count'}`);
        }
        return user_count;
}

exports.setRedisCount = async () => {
    return redisClient.set('user_redis_count',1);
}

exports.incrementRedisCount = async () => {
    return redisClient.incr('user_redis_count');
}