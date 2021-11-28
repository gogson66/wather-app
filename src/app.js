const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast')
const geolocation = require('./utils/geolocation')


const app = express()

// Setting paths for express config
const directoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setting handlebar views and engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setting directory path
app.use(express.static(directoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Goran Cvijanović'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Goran Cvijanović'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        text: 'This is page for your questions.',
        name: 'Goran Cvijanović'
    })
})
 
 
app.get('/weather', (req, res) => {
    if(!req.query.address) return res.send({error: 'You must type the address'})

    const {address} = req.query

    geolocation(address, function(error, {latitude, longitude, location} = {}) {
        if (error) return res.send({error})
    
    
        forecast(latitude, longitude, function(error, forecastData) {
            if (error) res.send({error})
        
            res.send({
                address,
                location,
                forecast: forecastData

            })
         
    })   

    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page does not exist',
        name: 'Goran Cvijanović'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Goran Cvijanović'
    })
})

app.listen(3000, () => {
    console.log('Server started');
    
})