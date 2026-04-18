const router = require('express').Router()
const {checkLogin} = require('../middleware/auth')
const {createUser,
    getAll,
    createUserFromDb,
    getAllFromDb,
    LoginUserFromDb,
    getOneFromDb,
    LoginAdminFromDb,
    enterBankDetails,
    enterDetails,
    LoginUser,
    getOne} = require('../controller/userController')

// router.post('/user',createUser)

// router.get('/user',getAll)

router.post('/Duser',createUser)

router.post('/DLuser',LoginUser)

router.get('/Duser',checkLogin ,getAll)

router.get('/Duser/:id',getOne)

router.post('/DLadmin',LoginAdminFromDb)

router.patch('/Duser/:id',enterDetails)

module.exports = router

