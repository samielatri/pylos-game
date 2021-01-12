install npm, nodejs, postman and mongodb.

Test it locally :
 0) config/config.env : 
	NODE_ENV=development
	PORT=PORT
	MONGO_URI_cloud=mongodb+srv://USER:PASSWORD@URL
	MONGO_URI=mongodb://localhost/ROUTE
	SECRET_KEY='SECRET'
	SUPPORT_EMAIL = SUPPORT_EMAIL
	SUPPORT_PASSWORD = SUPPORT_PASSWORD
	SUPPORT_USER_NAME = SUPPORT_USER_NAME
	FILE_PATH= FILE_PATH
	FILE_ADDRESS:http://localhost/ROUTE
	
 1)	npm i 
 2)	npm start

To check the database : 
	use mongodbcompass and connect to (by default) localhost:27017

To test the REST backend API :
	api_collection/game.postman_collection.json
			-> load this is in Postman to test it

Here are some front examples used with the API :
	Login :
		Method: POST
		URL: http://localhost:7000/login
	Get all users:
		method Get
		URL: http://localhost:7000/users
		
