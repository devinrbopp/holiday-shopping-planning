const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')



// GET display all recipients
router.get('/', (req,res) => {
    db.recipient.findAll()
    .then((recipients) => {
        res.render('recipients/index', {recipients: recipients })
    }).catch(error => {
        console.error()
    })
    // res.render('recipients/recipients')
})

// GET create new recipient form
router.get('/new', isLoggedIn, (req,res) => {
    res.render('recipients/new')
})

// POST create new recipient form
router.post('/', isLoggedIn, (req, res) => {
    console.log(req.body)
    db.recipient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        relationship: req.body.relationship,
        userId: req.body.userId
    })
    .then((recipient) => {
        res.redirect('/recipients')
    })
    .catch((error) => (
        console.error()
    ))
})

module.exports = router