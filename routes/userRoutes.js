const router = require('express').Router()
const {createUser,getAll,createUserFromDb,getAllFromDb,LoginUserFromDb} = require('../controller/userController')

router.post('/user',createUser)

router.get('/user',getAll)

router.post('/Duser',createUserFromDb)

router.post('/DLuser',LoginUserFromDb)

router.get('/Duser',getAllFromDb)


module.exports = router

