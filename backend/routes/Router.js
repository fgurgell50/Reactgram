const express = require("express");
const { route } = require("./UserRoutes");
const router = express();

router.use('/api/users', require('./UserRoutes'))

// test rout
router.get('/', (req, res) =>{
    res.send('API WORKING!')
})

module.exports = router