// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()


// 用get加入一條「登入表單頁面」的路由， 再用render匯出路由模組
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router