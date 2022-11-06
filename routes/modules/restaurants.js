// 引用 Express 與 Express 路由器
const express = require("express")
const router = express.Router()

// 引用 Restaurant model
const Restaurant = require("../../models/Restaurant")

// 新增餐廳頁面
router.get("/new", (req, res) => {
  res.render("new")
})

// 瀏覽特定餐廳
router.get('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("show", { restaurant }))
    .catch(err => console.log(err))
})

// 新增餐廳
router.post("/", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 編輯餐廳頁面
router.get("/:id/edit", (req, res) => {
  const { id } = req.params
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => console.log(err))
})

// 更新餐廳
router.put("/:id", (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(err => console.log(err))
})

// 刪除餐廳
router.delete('/:id', (req, res) => {
  const { id } = req.params
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})


// 匯出路由模組
module.exports = router