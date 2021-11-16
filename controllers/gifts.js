const express = require('express')
const router = express.Router()
const db = require('../models')
const axios = require('axios')

// index gift display
router.get('/', (req,res) => {
    res.render('gifts/index')
})

// search
router.get('/results', (req, res) => {
    // pull in search query from form HERE and assign to variable
    let keyword = 'cats'

    // axios request
    axios.get(`https://openapi.etsy.com/v3/application/listings/active?client_id=${process.env.ETSY_API_KEY}&keywords=${keyword}`)
    .then(apiResults => {
        console.log(apiResults.data.results)
    })
    .catch(error => {
        console.error
    })
})


module.exports = router