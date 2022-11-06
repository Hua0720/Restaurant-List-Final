const bcrypt = require('bcryptjs')

//載入restaurant model
const Restaurant = require("../restaurant")
const restaurantList = require("../../restaurant.json").results
const User = require('../user')

// 載入 .env 的檔案
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require("../../config/mongoose")// 引用mongoose

const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  collection: [0, 1, 2]
}, {
  name: 'user2,',
  email: 'user2@example.com',
  password: '12345678',
  collection: [3, 4, 5]
}]

db.once("open", () => {
  Promise.all(SEED_USERS.map((SEED_USER) =>
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const SEED_RESTAURANT = SEED_USER.collection.map(index => {
        restaurantList[index].userId = user._id
        return restaurantList[index]
      })
      return Restaurant.create( SEED_RESTAURANT )
    })
  ))
    .then(() => {
      console.log('done.')
      process.exit() // 關閉這段 Node 執行程序
    })
})