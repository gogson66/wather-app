const request = require('request')

const geolocation = function(city, callback) {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=pk.eyJ1IjoiZ29nc29uNjYiLCJhIjoiY2t2c2J2aDJ3MmtxNDJxb3Via2lkbzFkMCJ9.rR0-z6MMb8W2mUczJ2P58A&limit=1`

    request({url, json: true }, (error, response) => {
        if (error)  callback('Can not make connection with geolocation service', undefined);
        else if (response.body.features.length === 0) callback('Location not found', undefined);
        else {
            const {place_name: location, center: [longitude, latitude]} = response.body.features[0]
            callback(undefined, {latitude, longitude, location});
        }   
        
    })   
}

module.exports = geolocation