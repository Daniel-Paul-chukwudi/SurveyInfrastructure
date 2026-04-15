const userModel = require('../models/userModel')
const DB = require('../dummyData.json')
const fs = require('fs')
const otpGen = require('otp-generator')

const writeTODb= (content)=>{
        fs.writeFile('./dummyData.json',JSON.stringify(content,null,2),'utf-8',(error,data)=>{
        if(error){
            console.log("Error writing to file",error);
            
        }else{
            data
        }
    })
}

exports.createUser = async (req,res) =>{
    try {

        const {fullName,email,phoneNumber,password} = req.body

        const newUser = new userModel({
            fullName,
            email,
            phoneNumber,
            password
        })

        await newUser.save()
        res.status(201).json({
        message: 'user Created successfully',
        data: newUser
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })
    }
}

exports.createUserFromDb = async (req,res) =>{
    try {

        const {fullName,email,phoneNumber,password} = req.body

        const randomNumgenerator = () =>{
            code = otpGen.generate(9, { upperCaseAlphabets: false, lowerCaseAlphabets: false, digits: true, specialChars: false })
            return code
        }
        let userId
        let IDs = []
        DB.users.forEach((x)=>{
            IDs.push(x.id)
        })

        do{
            userId = `${randomNumgenerator()}`
        }while (IDs.includes(userId))

        const newUser = {
            id: userId,
            fullName,
            email,
            phoneNumber,
            password,
            totalPoints : 0,
            totalCompleted: 0
        }


        DB.users.push(newUser)
        writeTODb(DB)
        
        res.status(201).json({
        message: 'user Created successfully',
        data: newUser
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })
    }
}


exports.getAll = async (req,res)=>{
    try {
        const all = await userModel.find()

        res.status(200).json({
            message: "all users in the DB ",
            data: all
        })
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })    
    }
}

exports.getAllFromDb = async (req,res)=>{
    try {
        const all = DB.users

        res.status(200).json({
            message: "all users in the DB ",
            data: all
        })
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })    
    }
}

exports.LoginUserFromDb = async (req,res) =>{
    try {

        const {email,password} = req.body

        let user 
        for (const x of DB.users){
            if (x.email === email){
                user = x
            }
        }  
        if (!user){
            return res.status(403).json({
                message: "Invalid login credentials"
            })
        }else if(user.password !== password){
            return res.status(403).json({
                message: "Invalid login credentials"
            })
        }    

        
        res.status(201).json({
        message: 'user login successfully',
        data: user
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })
    }
}