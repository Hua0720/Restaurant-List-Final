// 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require("../../models/Restaurant")
// 引用 utilities 的 sort
const sorting = require('../../utilities/sort')

// 設定路由
router.get('/', (req, res) => {
  // 拿餐廳資料
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render("index", { restaurants }))
    .catch(err => console.log(err))
})

// 搜尋功能
router.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()
  const sortingType = req.query.sort
  const typeObject = {
    isOne: sortingType === '1',
    isTwo: sortingType === '2',
    isThree: sortingType === '3',
    isFour: sortingType === '4'
  }

  Restaurant.find({})
    .lean()
    .then(restaurants => {
      const filterRestaurants = restaurants.filter(
        list =>
          list.name.toLowerCase().includes(keyword) ||
          list.category.includes(keyword)
      )
      res.render('index', { restaurants: filterRestaurants, keywords })
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router