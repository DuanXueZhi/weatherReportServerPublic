const mongoose = require('mongoose')
const CityTripRecommendationsSchema = new mongoose.Schema({
    cityName: {type: String, required: true},
    wea: {type: String, default: ''},
    index: {type: Array, default: []},
    tem: {type: String, default: ''},
    tem1: {type: String, default: ''},
    tem2: {type: String, default: ''},
    date: {type: Date, required: true},
    meta: {
        createAt: {type: Date, default: Date.now()},
        updateAt: {type: Date, default: Date.now()}
    }
})
CityTripRecommendationsSchema.pre('save', function (next) {
    let nowTime = new Date();
    let ChinaTime = new Date(nowTime).getTime() - nowTime.getTimezoneOffset() * 60 * 1000;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = ChinaTime;
    } else {
        this.meta.updateAt = ChinaTime;
    }
    next();
});
CityTripRecommendationsSchema.statics = {
    addRecommendation: function (data, callbackFn) {
        return this
            .create({
                cityName: data.cityName,
                wea: data.wea,
                index: data.index,
                tem: data.tem,
                tem1: data.tem1,
                tem2: data.tem2,
                date: data.date
            }, callbackFn)
    },
    removeRecommendation: function (data, callbackFn) {
        return data
            .remove(callbackFn)
    },
    updateRecommendationMsg: function (_id, data, callbackFn) { // 修改单个推荐数据(没有用到)
        return this
            .update({_id: _id}, {$set: data}, {multi: false}, callbackFn)
    },
    findRecommendationMsg: function (data, cb) {
        return this
            .find(data)
            .exec(cb)
    }
}
module.exports = CityTripRecommendationsSchema

