const mogoose = require('mongoose');

// userRegosterSchema
const userRegisterSchema = new mogoose.Schema({
    // request id
    request_id: {
        type: String,
    },
    // user_id (person who done the request)
    user_id: {
        type: String,
    },
    // otherUser_id (person who receives the request)
    otherUser_id: {
        type: String,
    },
    // type of request
    request_type: {
        type: String,
    },
    // status
    status: {
        type: String,
    },
}, { timestamps: true });

module.exports = mogoose.model('friend_request', userRegisterSchema)
