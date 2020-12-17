const mongoose = require('mongoose');
const {Schema, model} = mongoose; 
  
const cardSchema = new Schema ( 
    {
      phrase:  String,
      translation: String,
      meaning: String,
      phraseAudioEng: String,
      translationAudioPt: String,
      meaningAudioEng: String,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }, 
    {
      timestamps: true  //created and updated at....
    }
    
  );

module.exports = model('Card', cardSchema);