### install postgres inside your local docker environment
`docker run --name postgresql-container -p 5432:5432 -e POSTGRES_PASSWORD=somePassword -d postgres`

### check your postgres is working or not, install the pg admin
`docker run --rm -p 5050:5050 thajeztah/pgadmin4`

### after your postgres installed properly, try to run the project via following steps

### to install the package dependency
`npm install`

### to run the prisma migration for connect with the postgres
`npx prisma migrate dev`

### to view your database 
`npx prisma studio`

### to run your project build inside docker
`docker build -t next-prisma-docker .`
`docker run -dp 3000:3000 next-prisma-docker`

### to run your project in local machine
`npm run dev`


## Project description

`npx prisma studio`  you need to add the user after the migration process are completed

at the begining of the project you need to add a user id in the given text box and the very next screen you can find the blank list of the project. as per your document the permission to create a project is in access table and the access table 
connected with the project table so without creating project we can not get access to create a project and the create permission is belongs to project id , so we are making the two conditions, where first condition base on the project access with the permission of the create after that user can find the create button , so at the begining we need to create one static project in the database and give it to access to creating a project. secondly we manage create button openly and every user can create the project.

in the list of the project you can find the button base on the permission of view , delete and update. when you create a new project you can't get project into the list until you add the permission in the Db manually