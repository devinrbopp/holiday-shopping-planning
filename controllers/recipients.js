const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')


// GET display all recipients
router.get('/', isLoggedIn, (req,res) => {
    db.recipient.findAll({where: {userId: req.user.dataValues.id}})
    .then((recipients) => {
        res.render('recipients/index', {recipients: recipients})
    }).catch(error => {
        console.error(error)
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
        res.redirect('/recipients')
    })
    .catch(error=> {
        console.error(error)
    })
})

// GET edit form
router.get('/edit/:id', isLoggedIn, (req,res) => {
    db.recipient.findOne({where: {id: req.params.id}})
    .then( recipient => {
        res.render('recipients/edit', {recipient})
    })
    .catch(error => {
        console.error(error)
    })
})

// PUT edit recipient form
router.put('/:id', isLoggedIn, (req, res) => {
    db.recipient.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }, {
        where: {id: req.params.id}
    })
    .then(result => {
        res.redirect('/recipients')
    })
    .catch(error => {
        console.error(error)
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
        console.error(error)
    })
})

// POST create new recipient form
router.post('/', isLoggedIn, (req, res) => {
    let interests = []
    if (req.body.cooking === 'on') {
        interests.push('cooking')
    }
    if (req.body.books === 'on') {
        interests.push('books')
    }
    if (req.body.music === 'on') {
        interests.push('music')
    }
    if (req.body.coding === 'on') {
        interests.push('coding')
    }
    if (req.body.art === 'on') {
        interests.push('art')
    }
    if (req.body.travel === 'on') {
        interests.push('travel')
    }
    if (req.body.woodworking === 'on') {
        interests.push('woodworking')
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
        console.error(error)
    ))
})

module.exports = router