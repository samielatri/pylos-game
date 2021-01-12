const mogoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: {
        type: String,
        trim: true,
        required: [true, 'Please Add user id']
    },
    game_played: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    game_lost: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    game_won: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mogoose.model('game_stats', productSchema)