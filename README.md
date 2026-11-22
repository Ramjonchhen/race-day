race-day project

### Running Things Locally
race-day project uses Postgres as the relational database; for consistency across environments, we are running the Postgres database using Docker

First, ensure you have Docker installed on your local system, and run this command to start a Docker container

```
docker run --name race-day-db -e POSTGRES_USER=raceday -e POSTGRES_DB=raceday -e POSTGRES_PASSWORD=race-day-db-password -p 5432:5432 -d postgres:18
```

Note: The database username and password are currently publicly available in README.md to make the setup process effective and for better configuration. In production, never use the publicly available credentials; keep them secure 

We are exposing the port to access the container; also use the required credentials (database name, username, and password ) provided as environment variables to connect to the database 

You can stop and resume existing containers instead of creating them every time using these commands: 

```
docker stop race-day-db 
```

Where race-day-db is the container name for the postgres container we started. Use the docker stop command before closing the project 

And restart the same container using the docker restart command 

```
docker restart race-day-db
```

Use these commands and this workflow of start, stop, and resume instead of creating a new container on every run