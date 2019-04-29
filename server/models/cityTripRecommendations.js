const mongoose = require('mongoose')
const CityTripRecommendationsSchema = require('../schemas/cityTripRecommendations')
const CityTripRecommendations = mongoose.model(
    'cityTripRecommendations',
    CityTripRecommendationsSchema
)
module.exports = CityTripRecommendations