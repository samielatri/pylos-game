import { Schema } from 'mongoose';

// userRegisterSchema
const userRegisterSchema = new Schema({
    email_id: {
        type: String,
        required: [true, 'Please add valid email']
    },
    username: {
        type: String,
        unique: true,
        index: {
            unique: true
        },
        required: [true, 'Please add a unique username']
    },
    password: {
        type: String,
        required: [true, 'Please add Password']
    },
    verification_code: {
        type: String
    },
    picture_url: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mogoose.model('users', userRegisterSchema)
