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
