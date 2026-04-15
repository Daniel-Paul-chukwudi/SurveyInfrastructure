const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
      fullName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        trim: true
      },
      phoneNumber:{
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true
      },
      isVerified:{
        type: Boolean,
        required: true,
        default: false
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
            type: mongoose.Schema.Types.ObjectId,
        },
        dateCompleted: {
            type: String,
        },
        }
        ],
      cashOutReady:{
        type: Boolean,
        default: false
      },
      cashOutTier:{
        type: String,
        enum: ['small','medium','large'],
        default:'small'
      },
      cashOutStatus:{
        type: String,
        enum: ['not ready','awaiting approval','sent'],
        default:'not ready'
      }
  },
  {
    timestamps:true,
  }
);

const userModel = mongoose.model('users', userSchema);

module.exports = userModel; 