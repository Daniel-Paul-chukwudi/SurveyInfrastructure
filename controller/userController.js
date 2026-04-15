const userModel = require('../models/userModel')
const DB = require('../dummyData.json')
const fs = require('fs')
const otpGen = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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


        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword
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

        if(!fullName || !email || !phoneNumber || !password){
            return res.status(403).json({
                message: "Please enter all fields"
            })
        }
        let Temail = []
        DB.users.forEach((w)=>{
            Temail.push(w.email)
        })

        if(Temail.includes(email)){
            return res.status(403).json({
                message: "Email already in use"
            })
        }

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
        const {role} = req.user
        if(role !== "admin"){
            return res.status(401).json({
            message: "unauthorized"
        })
        }

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
        const token = await jwt.sign({id:user.id},process.env.JWT_SECRET)

        
        res.status(201).json({
        message: 'user login successfully',
        data: user,
        token
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error Creating user',
        error:error.message
        })
    }
}

exports.getOneFromDb = async (req,res)=>{
    try {
        const {id} = req.params
        const all = DB.users
        let user 
        for (const x of all){
            if (x.id === id){
                user = x
            }
        } 
        if (!user){
            return res.status(404).json({
                message: "user not found"
            })
        }

        res.status(200).json({
            message: "User Found",
            data: user
        })
    } catch (error) {
        res.status(500).json({
        message: 'Error Getting user',
        error:error.message
        })    
    }
}

exports.LoginAdminFromDb = async (req,res) =>{
    try {

        const {userName,password} = req.body

         
        if (userName !== DB.admin.userName){
            return res.status(403).json({
                message: "Invalid login credentials"
            })
        }else if(password !== DB.admin.password){
            return res.status(403).json({
                message: "Invalid login credentials"
            })
        }
        const token = await jwt.sign({role:"admin"},process.env.JWT_SECRET)

        
        res.status(201).json({
        message: 'Admin login successfully',
        token
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Admin Login Error',
        error:error.message
        })
    }
}

exports.enterBankDetails = async (req,res) =>{
    try {
        const id = req.params.id
        const {accountNumber,date} = req.body

        if(!accountNumber || !date){
            return res.status(403).json({
                message: "Please enter all fields"
            })
        }
        
        let user

        for (const x of DB.users){
            if (x.id === id){
                user = x
            }
        } 
        user.accountNumber = accountNumber
        user.date = date

        writeTODb(DB)
        
        res.status(200).json({
        message: 'user Updated successfully',
        data: user
        })
        
    } catch (error) {
        res.status(500).json({
        message: 'Error updating user details',
        error:error.message
        })
    }
}