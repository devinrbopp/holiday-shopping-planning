const express = require('express')
const router = express.Router()
const db = require('../models')

router.get('/', (req,res) => {
    res.render('recipients/recipients')
})

router.get('/new', (req,res) => {
    res.render('recipients/new')
})

module.exports = router