const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/27baef498dd509e7af602448e161e44e/' + latitude + ',' + longitude
    // referencing the body property directly thru destructuring the response object:
    request({url, json: true}, (error, { body }) => {
        if (error) { // if some lower level OS/network problem...
            callback('Unable to connect to weather service...', undefined)
        } else if (body.error) { //if problems with json object assigend to response
            callback('Unable to find location.', undefined)
        } else { // if no problems...
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.' )
        } 
    })
}

module.exports = forecast