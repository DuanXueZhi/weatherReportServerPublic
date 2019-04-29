const express = require('express')
const router = express.Router()
const CityTripRecommendation = require('../models/cityTripRecommendations')
const nginxIntercept = '.weatherReport'
router.post('/add_recommendation' + nginxIntercept, (req, res) => {
    let recommendationData = req.body.data.recommendationData
    CityTripRecommendation.findRecommendationMsg({cityName: recommendationData.cityName, date: recommendationData.date}, (err, data) => {
        if (err) {
            return res.json({code: -2, msg: '数据库错误'})
        } else if (data.length === 0){
            CityTripRecommendation.addRecommendation(recommendationData, (err1) => {
                if (err1) {
                    return res.json({code: -1, msg: '推荐出行信息存储错误'})
                } else {
                    return res.json({code: 0, msg: '推荐出行信息储存成功'})
                }
            })
        } else {
            return res.json({code: -3, msg: '推荐出行信息已存在', data: data})
        }
    })
})
router.delete('/delete_recommendation' + nginxIntercept, (req, res) => { // 没用到（可以直接在数据库中设置固定时间删除数据）
    let date = req.query.date // 获取传来的日期
    let cityName = req.query.cityName // 获取传来的城市名
    let searchData = {
        cityName: cityName,
        date: date
    }
    CityTripRecommendation.findRecommendationMsg(searchData, (err, data) => {
        if (err) {
            return res.json({code: -1, msg: '删除推荐出行信息-查询出错'})
        } else if (data.length !== 0) {
            CityTripRecommendation.removeRecommendation(data, (err1, doc) => {
                if (err1) {
                    return res.json({code: -2, msg: '删除推荐出行信息出错'})
                } else {
                    return res.json({code: 0, msg: '删除推荐出行信息成功', data: doc})
                }
            })
        } else {
            return res.json({code: -3, msg: '删除推荐出行信息-查询成功-数据为空', data: data})
        }
    })
})
router.post('/recommendation_findList' + nginxIntercept, (req, res) => {
    let searchData = req.body.data.searchData
    for (var obj in searchData) {
        if (searchData[obj] === '') {
            delete searchData[obj]
        }
    }
    CityTripRecommendation.findRecommendationMsg(searchData, (err, data) => {
        if (err) {
            return res.json({code: -1, msg: '查询出错'})
        } else if (data !== '') {
            return res.json({code: 0, msg: '查询成功', data: data})
        } else {
            return res.json({code: -3, msg: '推荐出行信息不存在'})
        }
    })
})
module.exports = router