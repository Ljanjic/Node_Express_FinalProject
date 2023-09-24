Node/Express Final Project: Full Stack

Developing Your Own Express Application

For the final project, you will each design and develop your own Express application. You will have two weeks to complete the project. As that is a short time for a fully functional application, the applications will have to be relatively simple, with only a few features implemented.

Goal of the Application

The goal of the project is to showcase what you have learned during class. You will have the opportunity to demonstrate your knowledge and creativity. You are required to create an Express application from scratch. A proposal for what your application will do is required to be submitted before you start working on the project.

Requirements for the Project (Rubric)

Create a full Node/Express application from scratch using the MongoDB database. It must contain the following elements:
Models & Controllers
At least two Mongoose data models. One of these must be a User data model, as you need to implement logon.
Implement user registration and logon. Authentication must use JSON Web Tokens. Passwords must be stored hashed.
Model attributes should use several different data types (number, string, boolean, date, array etc.).
Include validation of your attributes to prevent the creation of invalid records.
For any models beside the User model, implement all the CRUD (create, read, update, delete) operations in your controllers.
Bonus: implement some non-CRUD operations (like sorting, paging, etc.).
Implement routes and controller operations so that registration, logon, and all CRUD operations can be performed via APIs.
Implement access control middleware so that at least the create/update/delete operations require authentication. You can have unauthenticated read operations if you choose.
Implement error handling middleware so that appropriate status codes and error messages are returned to the caller if errors occur.
Test registration, authentication, and all CRUD operations using Postman.

Bonus: implement some automated tests using Chai.

Front End
Implement a front end for your application using HTML, JavaScript, and CSS. The front end should be served up from the public directory of the same Express instance that hosts the back end.
In the front end, implement support for registration, logon, and logoff operations.
Implement views for the CRUD operations for each model:
Index – view to list all the records for that model, including buttons or links for show, edit, and delete.
New – form to create a new record
Edit – form to update an existing record
Show – view to see a specific record
Form controls should include several types of input fields, which might include inputs, textareas, dropdowns, checkboxes, and radio buttons.
Links or buttons should be provided to help the users navigate the application.

Style your application by adding CSS to make the application attractive. Consider the inclusion of images, color, fonts, and other CSS styling.

Deployment
Include security protections for your back end.
Deploy the back end to Render.com.

Bonus
Do something extra. This could be the implementation of a more complicated data model, or use of additional npm packages, callouts from the back end to other public APIs, or whatever your creativity inspires.

Submission
You should submit a link to a Github repository which contains your application. It is highly encouraged that you use git branches to implement each feature. This is so that if you make a mistake, it does not ruin the work you have done up to that point. We will share a link to a form before the due date which you can use to submit your link. You should also submit a link to the front end for your application.

Presentation
Each student will present their application in a Zoom meeting. You will only have 5 minutes for each presentation, but we will have reviewed your application with you ahead of time.

Setup
npm install && npm start

Database Connection
Import connect.js
Invoke in start()
Setup .env in the root
Add MONGO_URI with correct value
Routers
auth.js
jobs.js
User Model

Email Validation Regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)\*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

#### Register User(Route)

Validate - name, email, password - with Mongoose
Hash Password (with bcryptjs)
Save User
Generate Token
Send Response with Token

#### Mongoose Errors

Required
Duplicate Values

#### Login User(Route)

Validate - email, password - in controller
If email or password is missing, throw BadRequestError
Find User
Compare Passwords
If no user or password does not match, throw UnauthenticatedError
If correct, generate Token
Send Response with Token
Mongoose Errors
Validation Errors
Duplicate (Email)
Cast Error
Security
helmet
cors
xss-clean
express-rate-limit
Swagger UI

/bDays/{id}:
parameters: - in: path
name: id
schema:
type: string
required: true
description: the bDay id
