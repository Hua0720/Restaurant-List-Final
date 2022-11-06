// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 用get加入一條「登入表單頁面」的路由， 再用render匯出路由模組
router.get('/login', (req, res) => {
  res.render('login')
})

// 用post加入一條「login登入進去」的路由
router.post('/login', (req, res) => {
})

// 用get加入一條「註冊頁面」的路由， 再用render匯出路由模組
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router