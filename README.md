# ResearchRadar

## Capstone Project Idea

ResearchRadar is an AI-powered MERN research opportunity discovery platform that helps researchers find relevant grants, track deadlines, save opportunities, and understand emerging research trends. The product combines a personalized researcher profile with intelligent matching so users can quickly discover funding opportunities aligned with their interests, publications, and project goals.

The platform will use mock data for the MVP and later connect to real opportunity sources, authentication, and a database. The proposed core experience includes a dashboard, opportunity search and filtering, detailed grant views, saved opportunities, deadline reminders, profile-based recommendations, and emerging trend insights.

## Day-by-Day Plan

### Day 1 — Project Setup and Repository
- Create and configure the GitHub repository.
- Initialize the MERN application structure.
- Set up the README, project documentation, branches, and issue tracking.

### Day 2 — UX and Requirements
- Finalize the primary user flows and wireframes.
- Define the MVP feature scope and data model.
- Create project issues and milestones.

### Day 3 — Authentication and Profiles
- Build user registration and login.
- Add profile creation for research interests, skills, and publications.
- Connect authentication to the backend.

### Day 4 — Backend and Opportunity Data
- Create MongoDB models and API routes.
- Add seed data for grants and research trends.
- Implement opportunity search and filtering APIs.

### Day 5 — Dashboard and Discovery UI
- Build the dashboard navigation and responsive layout.
- Display personalized opportunities, deadlines, and trend summaries.
- Integrate frontend data with backend APIs.

### Day 6 — Matching and Saved Opportunities
- Implement profile-based matching logic.
- Add save/unsave functionality and saved-opportunity views.
- Add deadline and notification states.

### Day 7 — Testing and Polish
- Test major user journeys and API endpoints.
- Improve responsive behavior, validation, loading, and error states.
- Fix bugs and complete the MVP documentation.

## Mock UX Design

Design link:
https://github.com/kishore-neymar/researchradar/blob/feature/mock-ux-design/docs/mock-ux-design.svg?raw=1

This mock UX demonstrates the application's primary dashboard, funding discovery flow, matching logic, and key user journeys for researchers evaluating opportunities.

## Mock UX Design

Design link:
https://github.com/kishore-neymar/researchradar/blob/feature/mock-ux-design/docs/mock-ux-design.svg?raw=1

This mock UX demonstrates the application's primary dashboard, funding discovery flow, matching logic, and key user journeys for researchers evaluating opportunities.

## Run locally

```bash
npm install
npm run dev
```

 feature/google-authentication
The app currently uses mock data and is ready to connect to real APIs/database later.

## Docker containerization

The complete stack can be containerized with Docker Compose:

```bash
GOOGLE_CLIENT_ID=your-google-client-id docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`
- Health check: `http://localhost:5000/api/health`
- MongoDB: `mongodb://localhost:27017`

The Compose stack runs the Next.js frontend, Express API, and MongoDB. Stop it with `docker compose down`; add `-v` to remove the database and uploads volumes.

## AI autocomplete

The opportunity search includes debounced AI-powered autocomplete. The backend exposes `POST /api/ai/autocomplete`, uses `OPENAI_API_KEY` with `gpt-4o-mini` by default, and falls back to local research-topic suggestions when no API key is configured.

## Unit testing

The server uses Vitest for unit tests. From the `server` directory, run `npm test` to execute the JWT authentication test suite, including token signing, verification, expiration, secret validation, and bearer-token middleware checks.

## Netlify frontend deployment

The frontend is configured for Netlify through `netlify.toml`:

1. Import this repository into Netlify and select the repository root as the project directory.
2. Netlify uses `npm run build` and the Next.js runtime plugin.
3. Set `NEXT_PUBLIC_API_URL` to the deployed Render API URL, for example `https://researchradar-api.onrender.com`.
4. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` to the same Google OAuth Web Client ID used by the backend.
5. Add the final Netlify URL to the authorized Google OAuth origins.

## Render backend deployment

The API is configured for Render using `render.yaml` at the repository root:

1. Create a new Render Blueprint from this GitHub repository.
2. Set `MONGODB_URI` to the MongoDB connection string.
3. Set `GOOGLE_CLIENT_ID` to the Google OAuth Web Client ID if Google login is used.
4. Render automatically generates the `JWT_SECRET` and runs `npm install` followed by `npm start` from the `server` directory.

The deployment health endpoint is `/api/health`.

## File uploads

Authenticated users can upload PDF, Word, JPEG, and PNG files up to 5 MB from `/uploads`. Uploaded files are stored securely on the server, owned by the authenticated user, and available through the upload API.

## Bruno API templates

The complete ResearchRadar API collection is available in [`bruno/ResearchRadar/`](./bruno/ResearchRadar). It documents authentication, CRUD operations, relationships, trends, saved opportunities, uploads, and system health endpoints. Setup instructions are in [`bruno/README.md`](./bruno/README.md).

## Google authentication

1. Create a Google OAuth 2.0 Web Client and add the application's frontend origin.
2. Set `GOOGLE_CLIENT_ID` in `server/.env` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in the Next.js environment.
3. Google credentials are verified server-side before a ResearchRadar JWT is issued.

Open http://localhost:3000. The app currently uses mock data and is ready to connect to real APIs and a database later.
 main
