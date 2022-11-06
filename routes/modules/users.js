// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入建立好的 User model
const User = require('../../models/user')

// 引用 passport
const passport = require('passport')

// 引用 bcrypt
const bcrypt = require('bcryptjs')  // 載入套件

// 用get加入一條「登入表單頁面」的路由， 再用render匯出路由模組
router.get('/login', (req, res) => {
  res.render('login')
})

// 用post加入一條「login登入進去」的路由
// 加入 middleware(中介軟體)，驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  // 成功重定向 '路由'
  successRedirect: '/',
  // 失敗重定向 '登入畫面'
  failureRedirect: '/users/login'
}))

// 用get加入一條「註冊頁面」的路由， 再用render匯出路由模組
router.get('/register', (req, res) => {
  res.render('register')
})

// 用post加入一條「註冊表單頁面」的路由
router.post('/register', (req, res) => {
  // 取得註冊表單參數 {} -> 放入物件，解構賦值語法
  const { name, email, password, confirmPassword } = req.body
  // 新增碰到錯誤時的陣列
  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '除了名字外，其餘欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // 檢查使用者是否已經註冊(用email為基準) ， findOne 為 mongoose 語法
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' })
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    // 如果還沒註冊：寫入資料庫
    return bcrypt
      .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
      .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then(hash => User.create({
        name,
        email,
        password: hash // 用雜湊值取代原本的使用者密碼
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

// 設定登出路由
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
  })
})

module.exports = router