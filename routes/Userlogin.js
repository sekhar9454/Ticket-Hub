const express = require('express');


const router  = express.Router();


router.get('/' ,(req, res)=>{
    res.render('login', {
           title: 'Login to Your Account',
           errorMessage: null 
       });
} );


module.exports = router;
