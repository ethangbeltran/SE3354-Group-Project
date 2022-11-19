# FastSnacks

_insert description here_

# Commands

- `npm install`: Installs or reinstalls necessary dependencies
- `npm start`: Starts the server
- `npm watch`: Starts the server in development mode (watches for code changes)
- `npm run format`: Runs the code formatter

# Project Structure

- `public`: Static files served by the website, should use JavaScript for dynamic parts
- `routes`: Endpoint routing for the backend
- `util`: Utilities for the backend such as the database
- `templates`: Nunjucks HTML templates, served to the frontend after being transformed by the backend
- `.env`: Contains project variables
  - `PORT` (default `3000`)
  - `SESSION_SECRET`: Used to secure cookies, should be kept secret per-environment
  - `DATABASE` (default `main.db`): The SQLite database file to be used

# Frontend/Backend Communication

- The frontend will contact the backend through API calls (probably JSON responses).
- The backend will serve the frontend via a static folder to `public` as well as HTML templates from `templates`.

# Endpoints

All endpoints will be relative to a base URL such as `https://example.com/api`. `GET /something` will be equivalent to `GET https://example.com/api/something`.
