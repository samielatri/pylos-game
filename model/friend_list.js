const mogoose = require('mongoose');

const userRegisterSchema = new mogoose.Schema({
    user_id: {
        type: String,
        trim: true,
        required: [true, 'Please Add user id']
    },
    friend_id: {
        type: String,
        trim: true,
        required: [true, 'Please Add user id']
    },
    friend_status: {
        type: String,
        trim: true,
        required: [true, 'Please Add user id']
    },
}, { timestamps: true });

module.exports = mogoose.model('friends', userRegisterSchema)