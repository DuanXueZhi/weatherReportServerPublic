const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const nginxIntercept = '.weatherReport'
router.post('/add_user' + nginxIntercept, (req, res) => {
    let userData = req.body.data.user
    Users.findOneUser({userName: userData.userName}, (err, data) => {
        if (err) {
            return res.json({code: -2, msg: '数据库错误'})
        } else if (data === null){
            Users.addUser(userData, (err1) => {
                if (err1) {
                    return res.json({code: -1, msg: '用户存储错误'})
                } else {
                    return res.json({code: 0, msg: '用户注册成功'})
                }
            })
        } else {
            return res.json({code: -3, msg: '用户已存在'})
        }
    })
})
router.delete('/delete_user' + nginxIntercept, (req, res) => {
    let userId = req.query.userId
    Users.findById({_id: userId}, (err, data) => {
        if (err) {
            return res.json({code: -1, msg: '删除用户-查询出错'})
        } else {
            Users.removeUser(data, (err1, doc) => {
                if (err1) {
                    return res.json({code: -2, msg: '删除用户出错'})
                } else {
                    return res.json({code: 0, msg: '删除用户成功', data: doc})
                }
            })
        }
    })
})
router.post('/user_update' + nginxIntercept, (req, res) => {
    let id = req.body.data.id
    let userData = req.body.data.user
    Users.updateUserMsg(id, userData, (err, data) => {
        if (err) {
            return res.json({code: -2, msg: '数据库错误'})
        } else {
            return res.json({code: 0, msg: '修改成功'})
        }
    })
})
router.post('/user_findOrList' + nginxIntercept, (req, res) => {
    let userData = req.body.data.user
    if (userData.userName) {
        Users.findOneUser({userName: userData.userName}, (err, data) => {
            if (err) {
                return res.json({code: -1, msg: '查询出错'})
            } else if (data !== '') {
                return res.json({code: 0, msg: '查询成功', data: data})
            } else {
                return res.json({code: -3, msg: '用户不存在'})
            }
        })
    } else {
        Users.find((err, data) => {
            return res.json({code: 0, msg: '查询成功', data: data})
        })
    }
})
router.post('/user_login' + nginxIntercept, (req, res) => {
    let userData = req.body.data.user
    Users.findOneUser({userName: userData.userName}, (err, data) => {
        if (err) {
            return res.json({code: -1, msg: '查询出错'})
        } else {
            if (data !== null) {
                if (data.password === userData.password) {
                    return res.json({code: 0, msg: '登录成功', data})
                } else {
                    return res.json({code: -2, msg: '用户名或密码错误'})
                }
            } else {
                return res.json({code: -3, msg: '用户不存在'})
            }
        }
    })
})
module.exports = router