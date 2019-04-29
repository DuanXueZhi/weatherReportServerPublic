const mongoose = require('mongoose')
const UsersSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, default: '000000'},
    identity: {type: String, required: true},
    userImage: {type: String, default: ''},
    userSex: {type: String, default: '男'},
    myCity: {type: Array, default: []},
    exist: {type: Boolean, default: true},
    meta: {
        createAt: {type: Date, default: Date.now()},
        updateAt: {type: Date, default: Date.now()}
    }
})
UsersSchema.pre('save', function (next) {
    let nowTime = new Date();
    let ChinaTime = new Date(nowTime).getTime() - nowTime.getTimezoneOffset() * 60 * 1000;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = ChinaTime;
    } else {
        this.meta.updateAt = ChinaTime;
    }
    next();
});
UsersSchema.statics = {
    addUser: function (data, callbackFn) {
        return this
            .create({
                userName: data.userName,
                password: data.password,
                identity: data.identity,
                userImage: data.userImage,
                userSex: data.userSex,
                myCity: data.myCity,
                exist: data.exist
            }, callbackFn)
    },
    removeUser: function (data, callbackFn) {
        return data
            .remove(callbackFn)
    },
    updateUserMsg: function (_id, data, callbackFn) {
        return this
            .update({_id: _id}, {$set: data}, {multi: false}, callbackFn)
    },
    findOneUser: function (data, cb) {
        return this
            .findOne(data)
            .exec(cb)
    }
}
module.exports = UsersSchema

