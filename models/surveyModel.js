const mongoose = require('mongoose');

const surveySchema =new mongoose.Schema({
      category: {
        type: String,
        required: true,
        trim: true
      },
      title: {
        type: String,
        required: true,
        trim: true
      },
      points:{
        type: String,
        required: true,
      },
      allocatedTime: {
        type: String,
        required: true
      },
      totalQuestions:{
        type: Number,
        default: 0
      },
      questions:[
        {
            question:{
                type: String,
            },
            options:[]
        
        }
    ]
  },
  {
    timestamps:true,
  }
);

const surveyModel = mongoose.model('surveys', surveySchema);

module.exports = surveyModel; 