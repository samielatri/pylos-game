const mogoose = require('mongoose');

const userRegisterSchema = new mogoose.Schema({
    request_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    otherUser_id: {
        type: String,
    },
    request_type: {
        type: String,
    },
    status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mogoose.model('friend_request', userRegisterSchema)