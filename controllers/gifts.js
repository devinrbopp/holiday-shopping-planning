const express = require('express')
const router = express.Router()
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const axios = require('axios')

// index gift display
router.get('/', isLoggedIn, (req,res) => {
    db.sequelize.query(`SELECT g.name FROM gifts g INNER JOIN recipients r ON g."recipientId"=r.id INNER JOIN users u ON r."userId"=u.id WHERE u.id=${req.user.dataValues.id}`)
    .then( results => {
        res.render('gifts/index', {gifts: results[0]})
    })
    .catch( error => {
        console.error
    })
})

// search
router.get('/results', isLoggedIn, (req, res) => {
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
router.post('/', isLoggedIn, (req, res) => {
    
    console.log('req.body!!!!!!!!!!!', req.body)
    db.gift.create({
        name: req.body.name,
        store: req.body.store,
        isPurchased: 'false',
        recipientId: req.body.recipientId
    })
    .then( gift => {
        res.redirect('/gifts')
    })
    .catch( error => {
        console.error
    })
})

// DELETE a gift
router.delete('/:id', isLoggedIn, (req, res) => {
    db.gift.destroy({where: {id: req.params.id}})
    .then( deletedGift => {
        res.redirect('/gifts')
    })
    .catch(error => {
        console.error
    })
})

// PUT to mark a gift as purchased
router.put('/:id', isLoggedIn, (req, res) => {
    db.gift.update({
        isPurchased: 'true'
    }, {
        where: {id: req.params.id}
    })
    .then( result => {
        res.redirect('/gifts')
    })
    .catch(error => {
        console.error
    })
})

// // show a etsy product, and have the option to add it to a recipient
// router.get('/etsy/:etsyId', (req, res) => {
//     let etsyId = req.params.etsyId
//     // axios query
//     axios.get(`https://openapi.etsy.com/v3/application/listings/${etsyId}?client_id=${process.env.ETSY_API_KEY}&includes=images`)
//     .then(apiResults => {
//         res.render('gifts/new', {result: apiResults.data})
//     })
//     .catch(error => {
//         console.error
//     })
// })

// SAME CODE AS ABOVE but figuring out how to add recipients
router.get('/etsy/:etsyId', isLoggedIn, (req, res) => {
    let etsyId = req.params.etsyId
    console.log('etsy id delcared:', etsyId)
    const promise1 = axios.get(`https://openapi.etsy.com/v3/application/listings/${etsyId}?client_id=${process.env.ETSY_API_KEY}&includes=images`)
    const promise2 = db.recipient.findAll({where: {userId: req.user.dataValues.id}})
    
    Promise.all([promise1, promise2])
    .then( values => {
        console.log('PROMISE RESULTS!!!!!!!!!!!!', values)
        res.render('gifts/new', { etsyData: values[0].data, recipients: values[1] })
    })
    .catch(error => {
        console.error
    })

    
    
    
    // axios query
    // axios.get(`https://openapi.etsy.com/v3/application/listings/${etsyId}?client_id=${process.env.ETSY_API_KEY}&includes=images`)
    // .then(() => {
    //     db.recipient.findAll()
    //     console.log('found all recipients')
    // })
    // .then((apiResults, recipients) => {
    //     res.render('gifts/new', {result: apiResults.data})
    // })
    // .catch(error => {
    //     console.error
    // })
})

module.exports = router