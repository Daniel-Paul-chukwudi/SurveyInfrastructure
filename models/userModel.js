const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
      firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName:{
        type: String,
        required: true,
        trim: true
      },
      bankName:{
        type: String,
      },
      cardHolder:{
        type: String,
      },
      cardNumber:{
        type: String,
      },
      expiryDate:{
        type: String,
      },
      iban:{
        type: String,
      },
      cvv:{
        type: String,
      },
      address:{
        type: String,
      },
      city:{
        type: String,
      },
      country:{
        type: String,
      },
      email: {
        type: String,
        required: true,
      },
      phoneNumber:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true
      },
      totalPoints:{
        type: Number,
        default: 0
      },
      totalCompleted:{
        type: Number,
        default: 0
      },
      surveysCompleted:[
        {
        survey: {
            type: String,
        },
        dateCompleted: {
            type: String,
        },
        }
        ],
  },
  {
    timestamps:true,
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel; 