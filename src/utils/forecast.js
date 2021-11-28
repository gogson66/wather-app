const request = require('request')



const forecast = function(latitude, longitude, callback) {

    const url = `http://api.weatherstack.com/current?access_key=3bd2243251ab6e5d71b31080f8ac351f&query=${latitude},${longitude}`


    request({url, json: true}, function(error, response){
        if (error) callback('Can not make connection with weather service', undefined);
        else if (response.body.error) callback('Can not find location', undefined);
        else {
            const {temperature, feelslike, weather_descriptions: [weatherDescription] } = response.body.current
    
            callback(undefined,`${weatherDescription}. It is currently ${temperature} degree and it feels like ${feelslike} degree.`)  
        
        }
        
        
    })
    
}

module.exports = forecast

