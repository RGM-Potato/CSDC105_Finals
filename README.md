



Project Documentation
Fullstack Blog Application
by: 
Shamel Abendaño
Khalil Cea









Project Overview
The purpose of this Blog App (Info site) is to provide an interactive platform where users can securely register and log in, then effortlessly create, read, update, and delete created blog posts. 
Built on the MERN stack (MongoDB, Express, React, Node.js), it combines a React front end and a Node/Express back end and the MongoDB database. User authentication and authorization safeguard each author’s content, ensuring that only verified users can manage their own posts. Lastly it gives other users the convenience of browsing and reading existing posts.
The main features used in this app are:

The CRUD Functions - the blog site gives users the ability to create, read, update, and delete posts.
User Authentication and Authorization - users can register, log in, and log out. JSON Web Tokens are also implemented for authentication. Additionally users cannot edit posts made by different users due to this.
Blog Post Creation and Edit - users can create blog posts as well as edit them.
Rich-Text Editor for Post Creation - Integrated React Quill editor with toolbar options for headings, bold/italic, lists, links, images, and etc.
Image Upload - users can upload images when creating or editing blog posts.



Technologies Used
MongoDB	
Express.js
React
Node.js
Nodemon
Bcryptjs
Mongoose
Cors
JWT (JSON Web Token)
Cookieparser (Yarn)
Multer
FS Library
Mongoose
date-fns
ReactQuill

Setup Instructions
Download the zip file from the repository. Then open it in Vscode and also open Atlas DB in a browser. 

Note: If a computer is missing some key dependencies like express or nodemon, install them.

Open two instances of the terminal to streamline things.

Navigate to the “test” folder. Choose any terminal and type in (cd client) then (cd test).

Verify or Install Yarn. (Yarn install).

Go to the other terminal and navigate to the “api” folder (cd api).

Run the backend server by typing in (nodemon index.js).

Then lastly go back to the other terminal where you navigated to the “test” folder and type (yarn start).



Folder Structure




Backend:
api folder - Root folder for the backend files.
models folder - Folder containing the mongoose models.
Post.js - It defines the structure of the blog posts like the several strings for title, summary, content, etc.
User.js - Defines how users are stored  (the username and password) 
uploads folder - It is the folder where the images uploaded in the blogspot are located.
index.js - The main dish in this project.  Handles the user authentication function, the CRUD functions, the file uploads for cover images, cookies, imports dependencies and middlewares. 



 
Main folders for Frontend:
client\test folder - main root folder for frontend.
src folder - folder containing other subfolders like assets and pages.
asset folder - folder containing the assets of the blog site like the background image.


Src folder components:
App.css - main file that handles the designs of the blogsite.
App.js - this handles the page navigation like the various routing. Also <UserContextProvider> makes authenticated users access data that are otherwise inaccessible if they aren’t logged-in. 
Editor.js - this imports and uses ReactQuill, defines a custom toolbar with various actions for editing and creating posts. 
Header.js - basically the simple navbar at the top of the blogpost provides navigation links. 

pages folder and contents:
pages folder - contains the various javascript files corresponding to the pages of the blogsite. 
CreatePost.js - allows the input for the parameters regarding post details, image upload, and uses a POST request to submit created posts. ReactQuill helps a lot with this by making it easier to construct posts as well.
EditPost.js - it fetches a post’s data by its id then displays it, then lets the user change the contents of the post and lastly sends a PUT request to the backend.
IndexPage.js - with the help of React (usestate) this page can keep track of the posts array. Fetches all posts from the backend. Renders a container div that displays the posts array. 
LoginPage.js - this page authenticates the user and updates the app’s user state and then redirects to the home page upon success.
PostPage.js - the post page fetches and renders a single blog post in detail and with conditional editing access for the author. 
RegisterPage.js - simply put, it allows users to register by submitting their username and password to the backend and then shows basic success or failure feedback.





Code Explanation

BACKEND
Packages and Middleware:
Express -  The server framework.
Mongoose - Used to interact with MongoDB.
Bcryptjs -  For password hashing.
JSON Web Token -  For secure login sessions via tokens.
CookieParser - Allows reading cookies. Used for JWT.
CORS -  To allow cross-origin requests from the frontend.
Multer - For handling file uploads (images for blog posts).
FS Library -  For renaming uploaded files.


User Authorization (Register)

Registers users by receiving the username and password then saving the new user to the database. Also hashes the password for security. 



User Authorization (Login)

This authenticates users by checking if the user exists through comparison of their username and password. 
If successful it will generate a JWT Token.

Profile Route

It verifies the JSON Web Token stored in a user’s cookie and then returns the user’s info if the token is valid. 
This allows the frontend to determine if someone has logged in. This is basically how the app displays “logout”.


Create Post

What it does is that it accepts a blog post and an image file. Renames the file to keep its extension and saves the POST data into the database.
Also it uses the author’s ID to associate the post with a specific user through JWT verification.
Update Post 

Similar to Create Post, this snippet ensures that the file retains its correct extension when it is renamed by the system. 
User authentications. Verifies the JWT to ensure the user is a post’s author. 
Ensures only the author can modify their posts.


Updates the details of a blog post.
Get All Posts

Basically retrieves the latest 20 posts from the database.
Then sorts them from newest to oldest.
Get Post by ID

Fetches a specific post by its ID from MongoDB so it can be displayed when clicked in the blogspot.
Frontend
React Components:
RegisterPage.js - a controlled form that lets new users sign up.
LoginPage.js - form for existing users to authenticate.
CreatePost.js - form for creating a new blog post.
PostPage.js - displays one full post by ID, with title, date, author, image, and content.
IndexPage.js - Homepage listing all posts.

Register Page (Snippets)
State Management
 
Two state variables, used to hold form inputs.
API Call

On form submission, it sends user data to the backend for registration.



Login Page (Snippets)
State Management

Similar to Register Page. Two Variables used to hold form inputs.
API Call

Submits credentials and receives a cookie stored token if successful.
Create Post (Snippets)
State Management

React's “useState” hook lets the component store and update input values dynamically as the user interacts with the form. This enables real-time updates and form handling within a functional component.



API Call

This code creates a “FormData” and then sends a POST request to the localhost using the fetch function. This is typically used to submit a new post with text and a file to the server.
Post Page (snippets)
State Management

It uses “useState” to create a variable called “postInfo”. It is intended to store information about a post.
“setPostInfo” is used to update a post’s information when needed.



API Call

This code sends a GET request to the localhost to retrieve data for a specific post. Once the response is received and converted to JSON.
The resulting data is stored in the “postInfo” state using “setPostInfo”
Index Page
State Management

This line sets up a place to store a list of posts. It starts as an empty list, and “setPosts” is used to change or add to that list later.
API Call

When the component starts, this code gets a list of posts from the server. It shows the posts in the console and saves them so the app can use them. 

Challenges Faced
User Errors
Common issue for us novices in various things in coding. 
When using a different device, make sure that the IP address of the new device is registered to the database, in our case Atlas.
Typos
Also, a common issue, with so much code we read and type there is a chance that we will misspell something. 
Semicolons, Tildes, and Apostrophes 
Another typical issue and hard to see at times. 
Race against all the deadlines
A lot of things to do, not a lot of time. Especially if a lot of subjects are output based regarding the finals.

Future Improvements
Improved UI - the UI seems fine right now but I think we can do better and design better.
Improve Index Page Design - I think it can still be better. It’s as simple as it gets.			
Screenshots



Others


