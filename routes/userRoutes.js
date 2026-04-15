const router = require('express').Router()
const {checkLogin} = require('../middleware/auth')
const {createUser,getAll,createUserFromDb,getAllFromDb,LoginUserFromDb,getOneFromDb,LoginAdminFromDb,enterBankDetails} = require('../controller/userController')

router.post('/user',createUser)

router.get('/user',getAll)

router.post('/Duser',createUserFromDb)

router.post('/DLuser',LoginUserFromDb)

router.get('/Duser',checkLogin ,getAllFromDb)

router.get('/Duser/:id',getOneFromDb)

router.post('/DLadmin',LoginAdminFromDb)

router.patch('/Duser/:id',enterBankDetails)

module.exports = router

