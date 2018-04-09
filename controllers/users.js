const express = require('express')
const router = express.Router()
const User = require('../models/user')

app.get('/', (req, res, next) =>{
    res.json({data: db.users})
})


module.exports = router