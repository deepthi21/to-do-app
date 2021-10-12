# Introduction

This is the To do application tracking tasks that are due. This is a React based web application.
New tasks can be added and will be dispayed on screen based on the due date selected:
    - Any tasks that are due today or overdue will only be shown by default
    - Any tasks with due date as a future date will not be shown but persisted
    - To enable displaying future due tasks, set the corresponding enable flag to true in TodoList.js TODO_TYPES
Tasks created are stored in indexedDB (myToDos -> tasks) of user's browser

# NPM commands

## Setup all the dependencies

`npm install`

## Launch Browser App In Development Mode

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Launche unit tests and report coverage.

`npm test`

Uses Jest as the test framework.
Builds coverage reports and dumps them into ./coverage. Open ./coverage/lcov-report/index.html to view the local report in a nice html format.

All tests must be located in the ./tests/ folder, and they MUST have .test.js as the extension to be picked up.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### More improvements that can be done
    1. Cover more code and funtionality via test cases
    2. Make today and overdue list container's sub-heading sticky
    3. Custom message while adding future due task as not being displyed on screen / action button to view future due tasks
    3. Refactor code more to move configurations to public folder
    4. Styling updates to list containers, messages and heading
