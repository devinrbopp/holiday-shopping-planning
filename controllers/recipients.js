const express = require('express')
const router = express.Router()
const db = require('../models')


router.get('/', (req,res) => {
    res.render('recipients/recipients')
})

router.get('/new', (req,res) => {
    res.render('recipients/new')
})

router.post('/', (req, res) => {
    console.log(req.body)
    db.recipient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        relationship: req.body.relationship
    })
    .then((recipient) => {
        res.redirect('/recipients')
    })
    .catch((error) => (
        console.error()
    ))
})

module.exports = router