const bcrypt = require('bcryptjs'); // crypt

const Users = require('../../model/gameStats');
var fileUpload = require('../../controller/user/file-upload');

// addGameStats
exports.addGameStats = async (req, res, next) => {
    try {
        const transaction = await Users.create(req.body);
        // returned response
        return res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (error) { // internal server error
        console.log("Server Error is ", error);
        // returned response
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })
    }
}

// updateGameStats
exports.updateGameStats = async (data, user_id) => {
    try {
        // console.log('input data', data);
        const transaction = await Users.updateOne({ "user_id": user_id }, data);
        // retunrned response
        return result = {
            success: true,
            message: "Game Stats Updated Successfuly",
        }
    } catch (error) { // internal server error
        console.log("Server Error is ", error);
        //return result = {
        //    success: false,
        //    message: "Server error, please try again",
        //}
    }
}
