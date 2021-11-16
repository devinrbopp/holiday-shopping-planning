const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')


// GET display all recipients
router.get('/', isLoggedIn, (req,res) => {
    db.recipient.findAll({where: {userId: req.user.dataValues.id}})
    .then((recipients) => {
        res.render('recipients/index', {recipients: recipients })
    }).catch(error => {
        console.error
    })
    // res.render('recipients/recipients')
})

// GET create new recipient form
router.get('/new', isLoggedIn, (req,res) => {
    res.render('recipients/new')
})

// DELETE remove a recipient
router.delete('/:id', (req, res) => {
    db.recipient.destroy({where: {id: req.params.id}})
    .then( deletedRecipient => {
        console.log('you deleted', deletedRecipient)
        res.redirect('/recipients')
    })
    .catch(error=> {
        console.error
    })
})

// GET show individual recipient details
router.get('/:id', (req, res) => {
    // get recipients
    db.recipient.findOne({where: {id: req.params.id}})
    .then( recipient => {
        res.render('recipients/show', {recipient: recipient})
    })
    .catch(error => {
        console.error
    })
})

// POST create new recipient form
router.post('/', isLoggedIn, (req, res) => {
    let interests = []
    if (req.body.interest1 === 'on') {
        interests.push('interest 1')
    }
    if (req.body.interest2 === 'on') {
        interests.push('interest 2')
    }
    let interestsStr = interests.join(',')
    db.recipient.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        relationship: req.body.relationship,
        userId: req.body.userId,
        interests: interestsStr
    })
    .then((recipient) => {
        res.redirect('/recipients')
    })
    .catch((error) => (
        console.error
    ))
})

module.exports = router