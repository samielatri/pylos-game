const mogoose = require('mongoose');

// productSchema
const productSchema = new mogoose.Schema({
    // user_id
    user_id: {
        type: String,
        trim: true,
        required: [true, 'Please Add user id']
    },
    // number of game played or statisctics on that
    game_played: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    // number of game lost or statisctics on that
    game_lost: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    // number of game played or statistics on that
    game_won: {
        type: String,
        required: [true, 'Please add valid Score']
    },
    // date of creation (UTC format)
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mogoose.model('game_stats', productSchema)
