const mogoose = require('mongoose');

// userRegisterSchema
const userRegisterSchema = new mogoose.Schema({
    // email
    email_id: {
        type: String,
        required: [true, 'Please add valid email']
    },
    // username
    username: {
        type: String,
        unique: true,
        index: {
            unique: true
        },
        required: [true, 'Please add a unique username']
    },
    // password
    password: {
        type: String,
        required: [true, 'Please add Password']
    },
    // verification code if verification
    verification_code: {
        type: String
    },
    // picture_url : profile picture
    picture_url: {
        type: String
    },
    // date of creation (UTC format)
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mogoose.model('users', userRegisterSchema)
