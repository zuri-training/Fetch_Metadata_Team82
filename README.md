# Deployed at: deployed at: https://team82fetchmetadata.herokuapp.com/

DEPLOYMENT INSTRUCTIONS:
1. Create a folder: mkdir team82
2. Change directory: cd team82
3. Clone master branch: git clone -b master --single-branch https://github.com/zuri-training/Fetch_Metadata_Team82.git
4. Change directory to the project folder: cd Fetch_Metadata_Team82
5. Change directory to the api folder: cd api
6. Install the dependencies: npm install
7. Install pm2 globally: npm install pm2 -g
8. Start the server: pm2 start index.js

BY DEFAULT THE APP WILL RUN ON PORT 3000.
TO CHANGE THE PORT:
1. open the .env file: sudo nano .env
2. add the PORT on a new line to the file: PORT = the free port you want to run the app on.
3. save and exit
4. restart pm2: pm2 restart all


ENJOY







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


We avoided all developers to commit to avoid merge conflicts. The following is a list of who contributed what to backend:

@trapmoneyrai ON ROUTES FOR DOWNLOADING AND SHARING OF METADATA AND FILES TO OTHER SITES

@Greyshaws ON UPLOADING OF FILES FROM THE SERVER TO OTHER FILE SHARING SITES LIKE https://cloudinary.com/

@chukwujike ON USER REVIEW SECTION AND UPDATING THE CODE

@FitsumMehari ON GENERATION OF METADATA AND USER AUTHORIZATION AND AUTHENTICATION.


You can find the full documentation here:
https://documenter.getpostman.com/view/17563069/VUjJs82b
