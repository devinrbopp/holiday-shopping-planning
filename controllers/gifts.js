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
        res.render('gifts/results', {results: apiResults.data.results})
    })
    .catch(error => {
        console.error
    })
})

// POST add a gift
router.post('/', (req, res) => {
    db.gift.create({
        name: req.body.name,
        store: req.body.store
    })
    .then( gift => {
        res.redirect('/gifts')
    })
    .catch( error => {
        console.error
    })
})

// show a etsy product, and have the option to add it to a recipient
router.get('/:etsyId', (req, res) => {
    let etsyId = req.params.etsyId
    // axios query
    axios.get(`https://openapi.etsy.com/v3/application/listings/${etsyId}?client_id=${process.env.ETSY_API_KEY}&includes=images`)
    .then(apiResults => {
        res.render('gifts/new', {result: apiResults.data})
    })
    .catch(error => {
        console.error
    })
})


module.exports = router