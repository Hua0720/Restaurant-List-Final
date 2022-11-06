// 載入express、express-handlebars
const express = require('express')
// 載入 express-session
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override") // 載入methodOverride
const flash = require('connect-flash')   // 引用connect-flash套件

// 判別開發環境
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')// 引用路由器

// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')

require("./config/mongoose") // 引用mongoose

const bodyParser = require('body-parser') // 引用 body-parser

const app = express()
const PORT = process.env.PORT

// 設定handlebars引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案位置
app.use(express.static('public'))

// 使用 app.use() 註冊套件，並使用 session(option) 來設定相關選項
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 呼叫 Passport 函式並傳入 app
usePassport(app)

app.use(flash())  // 掛載套件

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
  next()
})

// 加入一組 middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// 將 request 導入路由器
app.use(routes)

// 設置監聽器
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})
