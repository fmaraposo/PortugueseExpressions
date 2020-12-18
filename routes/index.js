const express = require('express');
const router  = express.Router();
const Card = require('../models/Card');
const googleTTS = require('google-tts-api');
const { createIndexes } = require('../models/Card');



/* GET home page */
router.get('/', (req, res, next) => {
  req.app.locals.loggedUser = req.session.currentUser;
  Card.find()
  .limit(3)
  .then((allCardsFromDB) => {
    res.render('index', {user: req.session.currentUser, cards: allCardsFromDB});
  });
});

router.post('/card/:cardId', (req,res,next) => {
  let cardId = req.params.cardId;
  Card.findById(cardId)
  .then((card) => {
    googleTTS(`${card.phrase}`, 'en', 1)
    .then((url) => {
      console.log(url);
      res.json({url});
    });
  })
  .catch((err) => {
    console.error(err.stack);
  });
});  


module.exports = router;

