## Quick start guide 
# Backend - Node.js, express

1. Navigate to the folder Kwanyong-Jo-ecc-dssb-IS21-code-challenge-req101408/backend and run the following commands.
2. Run ```npm install``` to install the dependencies.
3. Start the server using ```npx nodemon server.js```.
4. The server will now start on port 5000.
5. If port 5000 is already in use, follow these steps to change the port number in the necessary files:
    a. Open the Kwanyong-Jo-ecc-dssb-IS21-code-challenge-req101408/backend/server.js file.
    b. In the server.js file, locate the line where the port is defined:
        Change 5000 to 5001:
        const port = 5000; -> const port = 5001;
    c. Save the changes in server.js.
    d. Now, navigate to the Kwanyong-Jo-ecc-dssb-IS21-code-challenge-req101408/frontend/src/constants.js file.
    e. In the constants.js file, locate the line where the API base URL is defined:
        Change localhost:5000 to localhost:5001:
        export const API_BASE_URL = 'http://localhost:5000/api'; -> export const API_BASE_URL = 'http://localhost:5001/api';
    f. Save the changes in constants.js.
    g. Restart the server by running the command npx nodemon server.js.
    h. The server will now start on the new port number, 5001.
    
The data for CRUD operations is saved in Kwanyong-Jo-ecc-dssb-IS21-code-challenge-req101408/backend/src/data.json.

For the information of API, access the swagger API document on localhost:5000/api/api-docs

# Frontend - React.js
1. In a separate terminal, Navigate to the folder Kwanyong-Jo-ecc-dssb-IS21-code-challenge-req101408/frontend and run the following commands.
2. Run ```npm install``` to install the dependencies.
3. Start the app using ```npm start```.
4. The app will now start on port 3000.



