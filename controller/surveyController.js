const surveyModel = require('../models/surveyModel')
const userModel = require('../models/userModel')
const DB = require('../dummyData.json')
const fs = require('fs')


const writeTODb= (content)=>{
        fs.writeFile('./dummyData.json',JSON.stringify(content,null,2),'utf-8',(error,data)=>{
        if(error){
            console.log("Error writing to file",error);
            
        }else{
            data
        }
    })
}

exports.addSurvey = async (req,res) =>{
    try {
        const {category,title,points,allocatedTime,questions}= req.body

        if( !category || !title || !points || !allocatedTime || !questions){
            res.status(403).json({
            message: 'Please enter all fields',
            error:error.message
            })
        }
        let tot = questions.length

        const newSurvey = new surveyModel({
            category,
            title,
            points,
            allocatedTime,
            questions,
            totalQuestions: tot
        })

        await newSurvey.save()
        res.status(201).json({
            message:"Survey Created successfully ",
            data: newSurvey
        })
    
    


    } catch (error) {
        res.status(500).json({
        message: 'Error Creating survey',
        error:error.message
        })
    }
}

exports.getAll = async (req,res)=>{
    try {
        const allSurveys = await surveyModel.find()
        res.status(200).json({
            message:"All the surveys in the DB ",
            data: allSurveys
        })

    } catch (error) {
        res.status(500).json({
        message: 'Error Creating survey',
        error:error.message
        })
    }
}

exports.getAllFromDb = async (req,res)=>{
    try {
        const allSurveys = DB.surveys
        res.status(200).json({
            message:"All the surveys in the DB ",
            data: allSurveys
        })

    } catch (error) {
        res.status(500).json({
        message: 'Error fetching survey',
        error:error.message
        })
    }
}

exports.completeSurvey = async(req,res)=>{
    try {
        const userId = req.params.id
        const surveyId = req.params.Sid

        const user = await userModel.findById(userId)
        const survey = await surveyModel.findById(surveyId)

        if(user.totalPoints + survey.points >= 20000){
            user.cashOutReady = true
            user.cashOutTier = "small"
        }else if(user.totalPoints + survey.points >= 50000){
            user.cashOutTier = "medium"
        }else if(user.totalPoints + survey.points >= 70000){
            user.cashOutTier = "large"
        }


        user.totalPoints +=  survey.points
        user.totalCompleted += 1
        user.surveysCompleted.push(
            {
                survey:surveyId,
                dateCompleted: Date.now()
            }
        )

        await user.save()
            res.status(200).json({
            message:"survey completed successfully",
            data: `total surveys completed is now ${user.totalCompleted} way to go`,
            user
        })


    } catch (error) {
        res.status(500).json({
        message: 'Error Completing survey',
        error:error.message
        })
    }
}

exports.completeSurveyFromDb = async(req,res)=>{
    try {
        const userId = req.params.id
        const surveyId = req.params.Sid

        let user 
        for (const x of DB.users){
            if (x.id === userId){
                user = x
            }
        }
        let survey
        for (const y of DB.surveys){
            if (y.id === surveyId){
                survey = y
            }
        }

        if(user.totalPoints + survey.points >= 20000){
            user.cashOutReady = true
            user.cashOutTier = "small"
        }else if(user.totalPoints + survey.points >= 50000){
            user.cashOutTier = "medium"
        }else if(user.totalPoints + survey.points >= 70000){
            user.cashOutTier = "large"
        }
        let totalsurveys = user.surveysCompleted?user.surveysCompleted : []

        user.totalPoints = (Number(user.totalPoints) + Number(survey.points)).toString()
        user.totalCompleted += 1
        totalsurveys.push(
            {
                survey:surveyId,
                dateCompleted: Date.now()
            }
        )
        user.surveysCompleted = totalsurveys

        writeTODb(DB)

            res.status(200).json({
            message:"survey completed successfully",
            data: `total surveys completed is now ${user.totalCompleted} way to go`,
            user
            })


    } catch (error) {
        res.status(500).json({
        message: 'Error Completing survey',
        error:error.message
        })
    }
}