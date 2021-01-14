const mogoose = require('mongoose');

// userRegisterSchema
const userRegisterSchema = new mogoose.Schema({
	firstName: String,
	lastName: String,
	nickname : String,
	password : String,
	mail : String,
	day : Number,
	month : Number,
}, { timestamps: true });

module.exports = mogoose.model('users', userRegisterSchema)

/*
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
    }
}, { timestamps: true });
*/

// logic of user
/*
// createUser from userData
async function createUser(userData) {
	const user = new User({
		firstName : userData.firstName,
		lastName : userData.lastName,
		nickname : userData.nickname,
		password : userData.password,
		mail : userData.mail,
		day : userData.day,
		month : userData.month,
	})
	const result = await user.save();
	console.log(result);
};

// getUsers
async function getUsers(){
  const allUsers = await User.find();
  return allUsers;
}

// removeUser with id
async function removeUser(id) {
  const result = await User.deleteOne({_id: id});
  // indicates the number of deleted documents
  console.log("The user has been deleted :"+result);
}
*/