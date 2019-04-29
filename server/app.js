const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json({'limit': '10240kb'}));
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1');
    if (req.method == "OPTIONS") res.sendStatus(200);
    else
        next();
});
mongoose.connect('mongodb://localhost:27017/WeatherReport', { useNewUrlParser: true }, function (err) {
    if(err) {
        console.log('MongoDB connection failed!',err);
    }else{
        console.log('MongoDB connection success!');
    }
});
const RMusers = require('./routeModels/RMusers')
const RMcityTripRecommendations = require('./routeModels/RMcityTripRecommendations')
app.use('/rm_users', RMusers);
app.use('/rm_cityTripRecommendation', RMcityTripRecommendations);
app.listen(3000, () => {
    console.log('Server is running')
})