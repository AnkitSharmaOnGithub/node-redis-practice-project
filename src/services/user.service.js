const redisClient = require("../models/redis.model");
const keyHelper = require("../helpers/key.helper");

exports.getUsers = () => {
  // TODO - Write code for fetching data from redis
  return 'Users data code needs to be written';
};

exports.getUser = async (userId) => {
  let redis_key = keyHelper.generateKey('users',userId);
  
  const userData = await Promise.all([
    redisClient.hGet(redis_key, 'username'),
    redisClient.hGet(redis_key, 'age')
  ]);
  
  return userData;
}

exports.createUser = async (username, hashedPassword, age) => {
  try {
    const counter = await redisClient.get('user_redis_count');
    let redis_key = keyHelper.generateKey('users',counter);
    let data = await Promise.all([
        redisClient.hSet(redis_key, 'username', username),
        redisClient.hSet(redis_key, 'age', age),
        redisClient.hSet(redis_key, 'password', hashedPassword)
    ]);
    if(data.length > 0){
      await redisClient.incr('user_redis_count');
    }
    return data;
  } catch (err) {
    // console.log(`Start error logging....`);
    // console.log(err);
    // console.log(`End error logging....`);
    return err;
  }
};

exports.login = async (userId, username, password) => {
  const redis_key = keyHelper.generateKey('users', userId);

  try {
    const user_data = await redisClient.hGetAll(redis_key);
    return user_data;
  } catch (error) {
    return error;
  }
}

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