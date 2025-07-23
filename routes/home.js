const express = require("express");
const path = require("path");
const router = express.Router();


// router.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
// })

router.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', user: 'Sanskar', showMessage: true });
});


module.exports = router;