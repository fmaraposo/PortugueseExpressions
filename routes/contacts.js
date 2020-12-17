const express = require('express');
const router = express.Router();
const Contacts = require('../models/Contacts');

router.get('/contacts', (req, res) => {
  res.render('contacts');
});

router.post('/contacts', (req, res) => {
  let {email, subject, message} = req.body;
  Contacts.create({
    email , 
    subject, 
    message
  })
  .then(()=> {
    res.redirect('/main');
  })
  });



module.exports = router;