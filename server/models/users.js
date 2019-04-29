const mongoose = require('mongoose')
const UsersSchema = require('../schemas/users')
const Users = mongoose.model(
    'users',
    UsersSchema
)
module.exports = Users