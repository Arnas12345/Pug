## Pre-reqs

- To run the app, you must have nodeJS installed, I am currently using node v18.18.2 and npm 9.8.1
- Changing the node/npm version can be done with Node Version manager by doing nvm use v18.18.2

## Running locally

- Firstly, in a terminal you must be in the WEATHERAPP directory. cd into weather-service directory. If your npm version is correct, you need to run npm install, this will install all required packages and modules
- To run the backend, run "npm start" once the npm install has finished
- Then, you must be open a new terminal while keeping the WeatherService running. cd into weather-ui directory. If your npm version is correct, you need to run npm install, this will install all required packages and modules
- To run the frontend, run "npm start" once the npm install has finished
- To run the tests, you can run npm test in both directories weather-service and weather-ui

## Notes

- The project was made using a backend server and a frontend, the frontend calls the APIs created in the backend server which allows to POST/GET the database.
- The data is persisted in the sensor.db under the sensor_data table. This can be viewed by adding a sql viewer extenstion to your IDE.
- One thing that I did not get working due to the time constraint was in the query code, query by the date range provided was not working. This was something to do with the format returned from the table and the time object I was providing it. Given I had more time I would of figured this out.
- Regarding the testing, I would have liked to use mock responses and a mock database rather than writing/reading to the DB as at the moment the tests use the actual DB provided. Due to the time constraints, I couldn't implement this. Also there is one test in the UI testing that I could not get working but the schema is there for it. It just fails when running the test.
- Both the GET and POST endpoints can be tested via POSTMAN.
