# React + TypeScript + Vite

We would like you to build a small SPA using React and React Router that allows a user to search crime data by postcodes.
At a minimum, the SPA should have a Search Bar, and Historic Search section, and have two distinct routes: a Data View screen and a Map screen of the crime data.
You can either create both routes or just a single one with a placeholder for the one that does not get implemented, the choice is yours. However, do build as if both routes were being made.
Time Limits
The evaluation of the test is not linked to how much time you spend on it. Though we recommend not spending more than 2 hours, if you haven't completed the task simply submit it as it is.
Results
Please share a git repository with us containing your implementation and information on how to set up the project.
Requirements
Search Bar
Allow the user to search by postcode
Allow the user to search by postcodes using a comma-separated list
Only trigger a search when at least one valid postcode has been entered
The query string should be updated to reflect the current list of valid postcodes
If the page is loaded with postcodes within the query string it should trigger a search on those postcodes
Make sure not to trigger too many requests
Searched Post Codes Navigation (Historic Search)
Display a list of all postcodes that have ever been searched
New searches append to the existing list
When a postcode is clicked the screen should display the crime data of that postcode
Persist search requests across browser contexts, refreshes, and new tabs using the browsers API's
The ability to remove a postcode from the list
Update the query string when a postcode is clicked
Make sure if a postcode is removed that it is also removed from the query string
Data View
Display an individual section for each crime type under which is a table
Each Table should display at a minimum the following values
Postcode
Date of crime
Approximate street name
Outcome status
Treat a null value in this field as 'On Going'
Give the user the ability to quickly navigate to different crime types
Map
View automatically centers on the searched postcode
In the case of multiple postcodes, center on the first item in the list
Display a mark on the map to show where each crime was committed
Show a boundary box of the postcode area
On hover of a mark should display a tooltip showing
Postcode
Category of crime
Date of crime
Outcome status
Treat a null value in this field as 'On Going'
Nice to haves
Cover your code with tests as much as you can
API to use
Post Code
http://api.getthedata.com/postcode/
Crime Data
https://data.police.uk/api/crimes-street/all-crime
Test Exceptions
Constraints
Use React V18
Use React Hooks
Use React Router
Do not leave any unused dependencies or scripts
Do not mock API response in your repository other than for tests
Preferences
Use TypeScript
Use any build tool or boilerplate configuration
ViteJS
Webpack,
Create-react-app
Use any design framework you are familiar with
Tailwind CSS
MUI
Ant Design
Evaluation points
Use of community best practices
Use of clean code which is self-documenting
Use of domain-driven design
Clean and extendable project structure
Consideration of UI/UX
Use of css-in-js
Use of design frameworks
Use of code quality checkers such as linters
Use of appropriate commit messages
