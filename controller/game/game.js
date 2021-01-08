const Users = require('../../model/gameStats');
const bcrypt = require('bcryptjs');
var fileUpload = require('../../controller/user/file-upload');
exports.addGameStats = async (req, res, next) => {
    try {
        const transaction = await Users.create(req.body);

        return res.status(200).json({
            success: true,
            data: transaction
        })
    } catch (error) {
        console.log("Server Error is ", error);
        return res.status(500).json({
            success: false,
            Code: 500,
            error: 'Server Error'
        })

    }
}

exports.updateGameStats = async (data, user_id) => {
    try {
        // console.log('input data', data);
        const transaction = await Users.updateOne({ "user_id": user_id }, data);

        return result = {
            success: true,
            message: "Game Stats Updated Successfuly",
        }
    } catch (error) {
        console.log("Server Error is ", error);

    }
}
