import { Schema } from 'mongoose';

// iserRegosterSchema
const userRegisterSchema = new Schema({
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
})

export default model('friends', userRegisterSchema)
