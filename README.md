# Cafe-Web-App-Backend

The promotion and management system for a café - server (backend) app.

## Project information

### Topic

Project created as part of the Engineering Thesis - 'The promotion and management system for a café', realized in the following team:
- Damian Bogusz - implementation of the server application; implementation of authorization, authentication and session mechanics in the web application
    - https://github.com/damianboguszpl
- Paweł Ciszewski - design and implementation of the web application; co-design of the REST-API endpoints in the server application
    - https://github.com/kardahim
- Marcin Ferenc - design and implementation of the mobile application
    - https://github.com/FerencMarcin

### System description

The created system consists of a server based on the Express development 
framework, a MySQL database, a website based on the React library and a mobile 
application which uses the Flutter framework. The central point of the system is the server. 
Preparing a REST API on it has allowed client applications to manage theresources of the shared database.
The website's main features are management of the cafe's offers, coupons and 
special offers, orders, seat reservations and user accounts. Access for users to various features is determined by the permissions level. Employees, managers (administrators), customers and non-logged-in guests have a different range of available service features. 
The mobile application has been prepared exclusively for customers and is an extension of the features offered by web browsers. Moreover, it includes elements of a loyalty system, in which one can earn points by purchasing at the cafe. Gained points can be later exchanged for coupons.
As a result of the project, a system following the project assumptions has been created. The system has been tested and is ready for implementation and compatible use.


## Component applications and installation instructions

### Component applications:
* Server app (JavaScript, Express, Node.js, Swagger, Json Web Token, MySQL database)
    - https://github.com/damianboguszpl/Cafe-Web-App-Backend
* Web app (TypeScript, React, Node.js, Material UI)
    - https://github.com/kardahim/cafe-frontend
* Mobile app (Dart, Flutter)
    - https://github.com/FerencMarcin/Cafe-mobile-app

### Server app installation instruction

To run server app Node.js with npm tool is required.

Installation instruction:
 1. Install all the dependencies (needed libraries and tools) specified in 'package.json' file using 'npm install' command.
 2. Using configuration schema '.env.example' file, prepare '.env' configuration file by declaring needed environment variables.
 3. Using configuration schema 'config.example.json' file, prepare 'config.json' database connection configuration file.
 4. Use 'npm start' command to run the project.
 
