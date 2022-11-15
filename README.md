# FastSnacks

_insert description here_

# Project Structure

- `public`: Static files served by the website, should use JavaScript for dynamic parts
- `routes`: Endpoint routing for the backend
- `util`: Utilities for the backend such as the database
- `templates`: Nunjucks HTML templates, served to the frontend after being transformed by the backend
- `.env`: Contains project variables
  - `PORT` (default `3000`)
  - `SESSION_SECRET`: Used to secure cookies, should be kept secret per-environment
  - `MYSQL_HOST`
  - `MYSQL_USER`
  - `MYSQL_PASS`

# Commands

- `npm start`: Starts the development server

# Frontend/Backend Communication

- The frontend will contact the backend through API calls (probably JSON responses).
- The backend will serve the frontend via a static folder to `public` as well as HTML templates from `templates`.

# Endpoints

All endpoints will be relative to a base URL such as `https://example.com/api`. `GET /something` will be equivalent to `GET https://example.com/api/something`.
