const User = require('../models/user.model')

const generateHelper = require('../helpers/generateHelper')


const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            deleted : false
        })
        res.json({
            code : 200,
            message : "Success!",
            data : users
        })
    } catch (error) {
        res.json({
            code : 400,
            message : "Error!",
            error : error
        })
    } 
}
const register = async (req, res) => {
    try {
        const existEmail = await User.findOne({
            email : req.body.email,
            deleted : false
        })
        if(existEmail) {
            res.status(400).json({
                message : "Email đã tồn tại!",
            })
        } else {
            const user = new User({
                fullname : req.body.fullname,
                email : req.body.email,
                password : req.body.password,
                phone : req.body.phone,
                token : generateHelper.generateRandomString(20)
            });
            const data = await user.save();
            const token = data.token
            res.cookie("token" , token)


            res.status(201).json({
                message : "Đăng ký tài khoản thành công!",
                data : data,
                token : token
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Đăng ký thất bại!",
            error : error
        })
    } 
}
const login = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Check email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    // console.log(user)
    if(!user) {
        res.status(400).json({
            message : "Email không tồn tại!"
        })
        return;
    }
    // Check password
    if(user.password != password){
        res.status(300).json({
            message : "Bạn đã nhập sai mật khẩu !"
        })
        return;
    }
    const token = user.token;
    res.cookie("token" , token);
    res.status(200).json({
        message : "Đăng nhập thành công!",
        user : user.fullname,
    })

}


module.exports = {
    getUsers,
    register,
    login,
}