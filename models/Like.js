const mongoose = require('mongoose');
const {Schema, model} = mongoose; 
  
const likeSchema = new Schema ( 
    {
      card:  {
        type: Schema.Types.ObjectId,
        ref: 'Card'
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }, 
    {
      timestamps: true  //created and updated at....
    }
    
  );

module.exports = model('Like', likeSchema);