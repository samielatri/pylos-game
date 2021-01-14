const Users = require('../../model/users');
const bcrypt = require('bcryptjs');
var fileUpload = require('../../controller/user/file-upload');
const { render } = require('ejs');

// mainMenu
exports.mainMenu = async (req, res) => {
    render('index', { title: "welcome" });
}

// registerUser
exports.registerUser = async (req, res, next) => {
    try {
        // console.log('input data', req.body);
        let fourDigitCode;
        fourDigitCode = 1000 + Math.floor(Math.random() * 9000);
        let cryptedPassword = await hashPassword(req.body.password);
        req.body.password = cryptedPassword;
        const transaction = await Users.create(req.body);

        //return res.status(200).json({
        //    success: true,
        //    data: transaction
        //})

        res.redirect('/game-menu');
        
    } catch (error) {
        console.log("Server Error is ", error);
        //return res.status(500).json({
        //    success: false,
        //    Code: 500,
        //    error: 'Server Error'
        //})
        
        res.redirect('/sign-up');

    }
}

exports.updateProfile = async (data, user_id) => {
    try {
        // console.log('input data', data);
        let cryptedPassword = await hashPassword(data.password);
        data.password = cryptedPassword;
        const transaction = await Users.updateOne({ "_id": user_id }, data);

        return result = {
            success: true,
            message: "Profile Updated Successfuly",
        }
    } catch (error) {
        console.log("Server Error is ", error);

    }
}
async function hashPassword(userPassword) {

    const password = userPassword
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}