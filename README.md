# FastSnacks

*insert description here*

# Project Structure

- `brainstorming`: Frontend brainstorming, no JavaScript functionality
- `public`: The files that are served by the website (consider these final results), should use JavaScript for dynamic parts

# Commands

- `npm start`: Starts the development server

# Frontend/Backend Communication

- The frontend will contact the backend through API calls (probably JSON responses).
- The backend will serve the frontend via a static folder to `public`.

# Endpoints

All endpoints will be relative to a base URL such as `https://example.com/api`. `GET /something` will be equivalent to `GET https://example.com/api/something`.
