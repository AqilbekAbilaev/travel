const express = require('express');
const {json} = require('express')
const cors = require('cors')
const { default: axios } = require('axios')
const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(express.static('dist'))

app.use(json())

app.use(cors())

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log(`Running successfully on ${port}`)
})

const weatherData = {
    data: []
};

app.post('/getData', async (req, res) => {
    const request = req.body;
    console.log(request)
    const response = await axios.post(`http://api.geonames.org/searchJSON?q=${request.city}&maxRows=5&username=${process.env.geonameUsername}`)
    const {lng, lat, countryName} = response.data.geonames[0];
    const responseFromWeatherAPI = await axios.post(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lng}&key=${process.env.weatherBit_API_KEY}`)
    const responseFromPixabay = await axios.post(`https://pixabay.com/api/?key=${process.env.pixabay_API_KEY}&q=${request.city}&image_type=photo`)
    weatherData.data.push(countryName, responseFromPixabay.data.hits[0].webformatURL)
    if (request.startDate && request.endDate) {
        responseFromWeatherAPI.data.data.forEach(day => {
            if (day.valid_date >= request.startDate && day.valid_date <= request.endDate) {
                weatherData.data.push({
                    date: day.valid_date,
                    max_temp: day.max_temp,
                    min_temp: day.min_temp,
                    weather: day.weather
                })
            }
        })
    } else {
        responseFromWeatherAPI.data.data.forEach(day => {
            weatherData.data.push({
                date: day.valid_date,
                max_temp: day.max_temp,
                min_temp: day.min_temp,
                weather: day.weather
            })    
        })
    }
    console.log(weatherData)
    res.send(weatherData)
    weatherData.data.length = 0;
})

module.exports = {
    weatherData
}