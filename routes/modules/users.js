// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入建立好的 User model
const User = require('../../models/user')

// 引用 passport
const passport = require('passport')

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
  // 檢查使用者是否已經註冊(用email為基準) ， findOne 為 mongoose 語法
  User.findOne({ email }).then(user => {
    // 如果已經註冊：退回原本畫面
    if (user) {
      console.log('User already exists.')
      // 放入name, email, password, confirmPassword，是為了頁面退回後保留原本key in好的資料
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      // 如果還沒註冊：寫入資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

// 設定登出路由
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router