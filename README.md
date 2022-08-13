After cloning the repository, go to the api directory and do the following.
	-Run npm install
	-Run npm install -g pm2
	-Run pm2 start index.js
By default it will run on port 3000.
If you want to change its port, you should edit the .env file and add: PORT = whatever port you want it to run on.










The api now functions for the following actions:
	-user login
	-user registration
	-file upload
	-generation of metadata
	-getting list of all files for a user
	-getting a single file for a user
	-file download
	-posting user review
	-getting all user reviews


We avoided all developers to commit to avoid merge conflicts. The following is a list of who contributed what:

@trapmoneyrai ON ROUTES FOR DOWNLOADING AND SHARING OF METADATA AND FILES TO OTHER SITES

@Greyshaws ON UPLOADING OF FILES FROM THE SERVER TO OTHER FILE SHARING SITES LIKE https://cloudinary.com/

@chukwujike ON USER REVIEW SECTION AND UPDATING THE CODE

@FitsumMehari ON GENERATION OF METADATA AND USER AUTHORIZATION AND AUTHENTICATION.


You can find the full documentation here:
https://documenter.getpostman.com/view/17563069/VUjJs82b
