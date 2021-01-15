What you'll need to install :
	npm, nodejs, postman and mongodb.

Test it locally :

 0)
 	config/config.env : 
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
	
 1)	
 	npm i or npm install
	(you can audit fix, it's not a problem)

 2)	
 	npm start or node . or nodemon .

/!\ look at the port you're using (it should not be listening to something else), for network part see socket.js file, first line

to host it :
	just host it and configure environment variables
		you can use heroku (it's free)

To check the database : 
	if the database is local
		use mongodbcompass and connect to (by default) localhost:27017
	if not 
		use mongodbcommunity
	the database can be online even if you test it locally


if you're only interested in playing the game:
	you can comment connectdb on server.js
	and go to the route /game
	routes were not secured for that purpose 

if you're interested in the backend api as it has many non front implemented features as add/remove/block/send/delete friend request/friend/ play and also CRUD for profile pictures and game stats for profiles of the users, you can test the api with postman (see below)

To test the REST backend API :
	api_collection/game.postman_collection.json	
			-> load this is in Postman to test it

for the AI, you can check the code but it's not fully complete

the code is very modular (multiple modules and functions + MVC + partials for views), so you can use it for any other application. It's also well documented (thanks to comments, conventions and explicite name variables).

we kept the console logs for better understanding of the flow of the code

stack : p5 library, bootstrap library, jquery library, mongodb and mongoose, nodejs and express, and socket.io.  
By the way, it's our first time using this stack (beside bootstrap and jquery).
of course, we also use html5, css3 and javascript

what we did modify from our last meet up : 
	the game (front and back) :
		better search :
			when searching, you can't search anymore, so we assure you're still searching
		multiple search :
			was implemented before but needed a quick fix for a case 
		more logs :
			more console logs and more logs of history of the game to make what's happening clear
		know who is playing and turn :
			show who is playing and turn
		better look up :
			better look for the game
		more checks :
			more checks for the game (especially outputs)
		victory/lost : 
			victory and lost implementations
	code :
		cleaner code :
			added comments and cleaned unused/commented code
		better reorganisation of files :
			reorganize files
	front of the website : 
		complete redone of the general front of the website
	AI : 
		better ai
	