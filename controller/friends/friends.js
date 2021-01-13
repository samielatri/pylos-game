const Users = require('../../model/friends_request');
const Friends = require('../../model/friend_list');
const friendsList = require('../../model/users');
const bcrypt = require('bcryptjs');

exports.friendRequest = async (req, res, next) => {
    try {
        // console.log('input data', req.body);
        const transaction = await Users.create(req.body);
        if (transaction) {
            console.log("ID IS", transaction._id);
            let reciverResponse = {
                "user_id": req.body.otherUser_id,
                "otherUser_id": req.body.user_id,
                "status": 0,
                "request_type": "Receive",
                "request_id": transaction._id,
            }
            // console.log("Receiver Response ",reciverResponse);
            await Users.create(reciverResponse);
        }
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

exports.acceptRequest = async (data) => {
    try {
        // console.log('input data', data);
        const userData = await Users.findOne({ $and: [{ "request_id": data.request_id }, { "request_type": "Receive" }] })
        if (!userData) {
            return result = {
                success: false,
                message: "Request Deleted/Removed",
            }
        } else {
            let addFriend = {
                "user_id": data.user_id,
                "friend_id": userData.otherUser_id,
                "friend_status": "Active"
            }
            await Friends.create(addFriend);
        }
        await Users.remove({ "request_id": data.request_id });
        await Users.remove({ "_id": data.request_id });

        return result = {
            success: true,
            message: "Friend Request Accepted Successfuly",
        }
    } catch (error) {
        console.log("Server Error is ", error);

    }
}

exports.changeFriendStatus = async (data) => {
    try {
        if (data.status == 'Block') {

            await Friends.updateOne({ $and: [{ "friend_id": data.friend_id }, { "user_id": data.user_id }] }, { "friend_status": "Block" });

            return result = {
                success: true,
                message: "Friend Blocked Successfuly",
            }
        } else {
            // await Friends.remove({ "friend_id": data.friend_id });

            return result = {
                success: true,
                message: "Friend Removed Successfuly",
            }
        }
    } catch (error) {
        console.log("Server Error is ", error);

    }
}