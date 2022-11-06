const mongoose = require('mongoose')
const Schema = mongoose.Schema //物件建構子

const userSchema = new Schema({
  // 使用 type 來設定資料型別，使用 required 設定是否為必填
  name: {
    type: String,
    required: true
  },
  // 使用 type 來設定資料型別，使用 required 設定是否為必填
  email: {
    type: String,
    required: true
  },
  // 使用 type 來設定資料型別，使用 required 設定是否為必填
  password: {
    type: String,
    required: true
  },
  // 使用 type 來設定資料型別，使用 default 設定預設值
  createdAt: {
    type: Date,
    default: Date.now //取得當下時間戳記：Date.now
  }
})
module.exports = mongoose.model('User', userSchema)