The Airbnb Clone is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that replicates the core functionality of Airbnb. The application allows users to browse, book, and list accommodations, providing a seamless experience for both travelers and property owners.

ENV variables:

create .env file in the client folder and add these variables

VITE_BASE_URL= http://localhost:4000

VITE_GOOGLE_CLIENT_ID= your google client id

create .env file in the api folder and add these variables

PORT= 4000

DB_URL= your db url

JWT_SECRET= your secret (string)

JWT_EXPIRY= 20d

COOKIE_TIME= 7

SESSION_SECRET= your secret session (string)

CLOUDINARY_NAME= your secret session

CLOUDINARY_API_KEY= your cloudinary key

CLOUDINARY_API_SECRET= your cloudinary api secret

CLIENT_URL= http://localhost:5173

Run project:

Open terminal, navigate to client directory and run below command to start frontend
    yarn run dev
Open another terminal, navigate to api directory and run this command to start backend server
    yarn start
Features

User Authentication: Users can sign up, log in, and log out securely. Passwords are hashed for security.

Google Login: Users can sign up and log in using their gmail.

<img width="1920" height="1080" alt="auth" src="https://github.com/user-attachments/assets/b6279b82-5c07-4eda-84f0-3a212c7cd95e" />

Search Listings: Users can search for accommodations.

<img width="2560" height="1121" alt="search" src="https://github.com/user-attachments/assets/9f01c81c-c73e-4feb-9408-027f8ef1d5ca" />

View Listings: Users can view detailed information about each accommodation, including photos, descriptions, amenities.

<img width="2560" height="1369" alt="image" src="https://github.com/user-attachments/assets/b726be66-23c4-4c0b-9924-1ad0a2b0fd65" />

Make Bookings: Authenticated users can book accommodations for specific dates.

<img width="1977" height="1112" alt="image" src="https://github.com/user-attachments/assets/6f5b003f-6b05-4d6f-b339-045bcbd0d797" />

Manage Listings: Hosts can create, edit, and delete their listings.

<img width="2560" height="1214" alt="image" src="https://github.com/user-attachments/assets/564fd1be-b407-4c5a-9b85-3bded3db125f" />

Responsive Design: The application is designed to be responsive and work seamlessly across different devices.

<img width="1851" height="1111" alt="image" src="https://github.com/user-attachments/assets/7b33a2c7-e85e-4053-af5e-47c1d832ec51" />

Technologies Used

MongoDB: NoSQL database for storing user data, listings.
Express.js: Web application framework for building the backend server.
React.js: JavaScript library for building the user interface.
Node.js: JavaScript runtime environment for executing server-side code.
Tailwind CSS: A utility-first CSS framework
Shadcn: UI library for styling based on Tailwind CSS
JWT: JSON Web Tokens for secure user authentication.
Cloudinary: Cloud-based image management for storing and serving images.
Google Cloud: For gmail based authentication
