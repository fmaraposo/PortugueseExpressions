const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const contactsSchema = new Schema (
  {
    email: {
      type: String,
      trim: true,
      required:  [true, "Email is required"]
    }, 
    subject: {
      type: String,
      required:  [true, "Subject is required"]
    },
    message: {
      type: String,
      required:  [true, "Message is required"]
    }
  }
);

module.exports = model('Contacts', contactsSchema );