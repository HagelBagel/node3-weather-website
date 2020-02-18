const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // set the entire application up as a function call

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public') // generate the path to the public folder
const viewsPath = path.join(__dirname, '../templates/views')  // generate path to templates folder
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views location
app.set('view engine', 'hbs') // set a value for a given express setting - setting up hbs/handlebars:
app.set('views', viewsPath)   // set views to viewsPath:
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath)) // setting up the static directory to serve:
// this is actually the root, which means it will load index.html by default,
// but localhost:3000/help.html will bring up help.heml, etc.

// set up routing for index.hbs view
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Christian F'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Christian F'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMsg: 'Need help? You have come to the right place!',
        name: 'Christian F'
    })
})

// set up a response for the route or url: app.com/weather
app.get('/weather', (req, res) => {
    // req = request, res = response
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //setting emptu obj as default param
        if (error) {
            return res.send({ error }) // object shorthand here
        }         
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })            
        })
    })   
})

app.get('/products', (req, res ) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// using wildscard to catch all for help 404's
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christian F',
        errorMsg: 'Help article not found.'        
    })
})

// set up 404 route, using the wildcard selector for Express, '*'.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Christian F',
        errorMsg: 'Page not found.'        
    })
})

// start the server
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})