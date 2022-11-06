// 載入express、express-handlebars
const express = require('express')
// 載入 express-session
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require("method-override") // 載入methodOverride

const routes = require('./routes')// 引用路由器
require("./config/mongoose") // 引用mongoose

const bodyParser = require('body-parser') // 引用 body-parser

const app = express()
const port = 3000 // 設定預設port

// 設定handlebars引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案位置
app.use(express.static('public'))

// 使用 app.use() 註冊套件，並使用 session(option) 來設定相關選項
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))


// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 設置監聽器
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
