const express = require('express')
const { registerUser, loginUser, logout, authMiddleware } = require('../../controllers/auth/auth-controller')
const authRouter = express.Router()


authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logout)
authRouter.get('/check-auth', authMiddleware, (req,res)=>{
    const user = req.user
    res.status(200).json({
        success : true,
        message : 'Authenticated user',
        user
    })
})


module.exports = authRouter