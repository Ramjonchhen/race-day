# Race Day API Project

## Quick Idea of the Project
The `race-day` project is a registrations API for run clubs. Rather than a standalone product, it is a learning project whose goal is to learn various backend concepts such as: where two people book the last available slot of a fixed size event at the same time. 

To learn the concepts more efficiently, it follows a **break, learn and fix** approach, using the running and run-club domain to model realistic scenarios.

## A Brief Tech Overview of the Project
At its core, `race-day project` is an HTTP server serving REST APIs backed by PostgreSQL.
* **Runtime & Language:** Node.js (version pinned in `.nvmrc`) and TypeScript.
* **Database:** PostgreSQL (running via Docker for local environment consistency).
* **Architecture Decisions:** Check [DECISIONS.md](./DECISIONS.md) to read the reasons behind the major technical choices made in this project.

---

## How to Get Started

### 1. Ensure Node.js is Set Up
Make sure you have the Node.js version specified in `.nvmrc` installed on your system.
* **If you use `nvm`:** Switch to the project's Node version in your terminal (run `nvm install` first if you don't have it downloaded yet):
  ```bash
  nvm use
  ```
* **If you don't use `nvm`:** Check `.nvmrc` for the required major version and ensure it is active in your terminal.

*(Note: If you open multiple terminals later to run scripts simultaneously, remember to run `nvm use` in each new terminal session if your system default differs.)*

### 2. Install Dependencies
Cleanly install the exact pinned dependencies using:
```bash
npm ci
```

### 3. Start the PostgreSQL Database
Ensure Docker is installed and running, and make sure port `5432` is free on your machine. Spin up the PostgreSQL container:

```bash
docker run --name race-day-db -e POSTGRES_USER=raceday -e POSTGRES_DB=raceday -e POSTGRES_PASSWORD=race-day-db-password -p 5432:5432 -d postgres:18
```

> **Note:** The credentials and port passed via `-e` and `-p` above are for local development only and map directly to your `.env.dev` file in the next step. Never use these credentials in production. See the [PostgreSQL Database Management](#postgresql-database-management) section below for stopping and restarting this container.

### 4. Configure Environment Variables
Create your local `.env.dev` file by copying `.env.example` (it is already pre-filled with the local Docker database defaults from Step 3):

```bash
# macOS / Linux / PowerShell / Git Bash
cp .env.example .env.dev

# Windows Command Prompt (CMD)
copy .env.example .env.dev
```
*(Review `.env.dev` and adjust `PORT` or database settings only if you changed the defaults in Step 3.)*

### 5. Run Database Migrations
Since TypeORM `synchronize` is disabled, apply the database schemas by running:
```bash
npm run migration:run
```
*(You can also revert migrations later using `npm run migration:revert`.)*

### 6. Start the Development Server
This project uses two separate terminal processes during development: one to watch and compile TypeScript, and another to run the compiled server.

1. **Terminal 1 — Live compile TypeScript to JavaScript (`dist/`):**
   ```bash
   npm run dev:compile
   ```
2. **Terminal 2 — Start the HTTP server with live reload:**
   ```bash
   npm run dev:run
   ```
   *(Ensure `dev:compile` has generated the `dist/` folder before starting `dev:run`.)*
   
### 7. Verify the Setup
Once the server is running without errors, test the health endpoint:
```bash
curl http://localhost:3000/health
```
If you receive `{"status":"healthy"}`, your setup is complete!

---

## PostgreSQL Database Management
Instead of creating a new container every time you work on the project, reuse the existing `race-day-db` container:

* **Stop the container** when you finish working:
  ```bash
  docker stop race-day-db
  ```
* **Restart the container** when you resume work:
  ```bash
  docker restart race-day-db
  ```