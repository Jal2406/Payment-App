const express = require('express')
const router = express.Router();
const userRoute = require('./userRoute')
const accRoute = require('./accRoute')

router.use('/user', userRoute)
router.use('/account', accRoute)

module.exports = router;

