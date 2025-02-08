const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

// register
const registerUser = async (req, res) => {
    const { userName, email, pws, role } = req.body;

    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            return res.json({ success: false, message: 'User Already exist' })
        }
        const hashPassword = await bcrypt.hash(pws, 12);
        const newUser = new User({
            userName: userName,
            email: email,
            pws: hashPassword
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registeration success"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}



// login
const loginUser = async (req, res) => {
    const { email, pws } = req.body;
    const checkUser = await User.findOne({ email })
    if (!checkUser) {
        return res.json({
            success: false,
            message: 'this user dose not exit'
        })
    }
    const checkPasswordMatch = await bcrypt.compare(pws, checkUser.pws);

    if (!checkPasswordMatch) return res.json({
        success: false,
        message: "Incorrect password! please try again"
    })

    const token = jwt.sign({
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email
    }, "CLIENT_SECRET_KEY", { expiresIn: "60m" })

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
        success: true,
        message: 'Logged in successfully',
        user: {
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id
        }
    })

}

// logout
const logout = (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully!'
    })
}

// auth middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized user'
        })
    }
    try {
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next()
    } catch(Error){
        res.status(401).json({
            success : false,
            message : 'Unauthorized user!'
        })
    }
}

module.exports = { registerUser, loginUser, logout ,authMiddleware}