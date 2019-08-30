const { User, UserPlant, UserCollection } = require('../../models')
const express = require('express')
const router = express.Router()

// router.post('/garden', (req, res)=>{
//     UserCollection.create({

//     })
// })

router.get('/:userId', (req, res) => {
    User.findOne({
        where: {
            id: req.params.userId,
        }
    })
        .then(user => {
            let userData = {
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                email: user.email,
            }
            res.status(200).json(userData)
        })
})

router.get('/:userId/garden', (req, res) => {
    UserCollection.findAll({
        where: {
            userId: req.params.userId,
        },
        raw: true
    })
        .then(collections => {
            res.status(200).json(collections)
        })
        .catch(error => {
            console.log(error)
            res.json('error: ' + error)
        })
})

//get plants for a user from a specific collection
router.get('/:userId/plants/:collectionId', (req, res) => {
    UserPlant.findAll({
        where: {
            collectionId: req.params.collectionId,
            userId: req.params.userId
        },
        raw: true
    })
        .then(plants => { 
            res.status(200).json(plants) })
        .catch(error => { 
            console.log(error)
            res.json('error: ' + error)
        })
})

//get all plants for a user
router.get('/:userId/plants', (req, res) => {
    UserPlant.findAll({
        where: {
            userId: req.params.userId
        },
        raw: true
    })
        .then(plants => { 
            res.status(200).json(plants) })
        .catch(error => { 
            console.log(error)
            res.json('error: ' + error)
        })
})

module.exports = router