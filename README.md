# ResearchRadar

ResearchRadar is an AI-assisted MERN-stack research opportunity discovery platform. It helps researchers and students search funding opportunities, inspect emerging research trends, save relevant grants, manage uploaded documents, and use profile-based personalization from a single dashboard.

## Problem Statement

Research funding is spread across many organizations and databases. Researchers waste time repeatedly searching, filtering, and comparing opportunities while missing relevant deadlines or emerging topics. ResearchRadar provides a focused, searchable discovery workspace that brings opportunity data, trends, saved items, profile context, authentication, and AI-assisted search suggestions together.

## Proposed Solution

ResearchRadar provides a responsive Next.js dashboard backed by an Express API and MongoDB. It includes account authentication, role-aware API authorization, opportunity and trend APIs, saved-opportunity management, secure document uploads, AI autocomplete, and deployment-ready Docker, Render, and Netlify configuration.

## Technology Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Lucide React
- **Backend:** Node.js, Express 5, Mongoose
- **Database:** MongoDB
- **Authentication:** JWT and Google Identity Services
- **AI:** OpenAI Chat Completions API with a local fallback
- **Testing:** Vitest
- **Deployment:** Docker Compose, Render, and Netlify
- **API Documentation:** Bruno collections

## Architecture Overview

```text
Browser / Next.js frontend
        |
        | REST and Google Identity
        v
Express API --> JWT / Google verification
        |
        +--> MongoDB (users, opportunities, trends, saved items, uploads)
        +--> OpenAI API (optional autocomplete provider)
        +--> Local filesystem (uploaded files)
```

The frontend is statically rendered and client-hydrated where interaction is required. API routes are organized by domain under `server/src/routes/`. Mongoose models contain persistence data, middleware protects authenticated operations, and the React dashboard consumes REST endpoints. AI autocomplete is a separate backend endpoint so provider credentials never reach the browser.

## Key Features

- Research opportunity dashboard and ranking view
- Debounced AI autocomplete with OpenAI support and local fallback
- Search, opportunity details, matching labels, and deadlines
- User registration, password login, refresh-aware session handling, and Google login
- Saved opportunities
- Emerging research trends
- Authenticated PDF, Word, JPEG, and PNG uploads up to 5 MB
- Secure JWT middleware and server-side Google credential verification
- Docker Compose development environment
- Unit tests for authentication and autocomplete behavior

## Installation Instructions

### Prerequisites

- Node.js 20 or newer
- npm
- MongoDB, or Docker with Docker Compose
- Optional: OpenAI API key and Google OAuth Web Client ID

### Clone and install

```bash
git clone https://github.com/kishore-neymar/researchradar.git
cd researchradar
npm install
cd server
npm install
cd ..
```

## Environment Setup

Copy `server/.env.example` to `server/.env` and configure the values:

```dotenv
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/researchradar
JWT_SECRET=replace-with-a-long-random-secret
GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
```

Set the frontend environment to point to the API:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-web-client-id.apps.googleusercontent.com
```

Do not commit real secrets. `.gitignore` excludes `.env` files.

## Running the Project

### Run locally with two processes

```bash
# Terminal 1: API
cd server
npm run dev

# Terminal 2: frontend
cd researchradar
npm run dev
```

- Frontend: `http://localhost:3000`
- API health: `http://localhost:5000/api/health`
- MongoDB: `mongodb://127.0.0.1:27017`

### Run with Docker Compose

```bash
GOOGLE_CLIENT_ID=your-google-client-id docker compose up --build
```

Stop the stack with `docker compose down`; add `-v` to remove persisted database and upload volumes.

### Tests and build

```bash
cd server
npm test

cd ..
npm run build
```

## API and Deployment

- Backend configuration: [`render.yaml`](./render.yaml)
- Frontend configuration: [`netlify.toml`](./netlify.toml)
- Docker configuration: [`compose.yaml`](./compose.yaml)
- Bruno API collection: [`bruno/ResearchRadar/`](./bruno/ResearchRadar)
- Deployment health check: `/api/health`

The repository is prepared for public Render and Netlify deployments. Configure the deployment environment variables documented above before opening the live services.

## Folder Structure

```text
app/                   Next.js pages and client components
server/src/
  config/              Database configuration
  middleware/          Authentication middleware
  models/              Mongoose models
  routes/              Domain REST API routes
  utils/               JWT and shared utilities
server/test/           Vitest suites
bruno/                 API request documentation
public/                Static assets
```

## Technical Decisions and Challenges

- Express routes are separated by domain to keep authentication, opportunities, uploads, and trends maintainable.
- Provider credentials remain on the backend, with the frontend requesting only normalized suggestions.
- Autocomplete uses a short debounce and local fallback so typing remains responsive and usable when OpenAI is unavailable or not configured.
- JWTs, Google verification, upload ownership, and server-side validation protect user data.
- Docker volumes preserve MongoDB and uploaded files between local container restarts.

The main development challenges were coordinating independent frontend/backend environments, validating Google credentials securely, preserving authorization ownership for uploads and saved items, and configuring the same application across local Docker and hosted platforms.

## Known Limitations

- The current AI endpoint generates search suggestions rather than producing a ranked opportunity dataset.
- Some dashboard datasets may be seeded or mocked until external grant feeds are connected.
- OpenAI autocomplete requires an API key and network access; fallback suggestions remain available without it.
- Hosted cold starts and free-tier database limits can affect availability.

## Future Improvements

- Integrate live grant-provider APIs and scheduled data synchronization
- Add profile embedding and persistent recommendation ranking
- Add deadline notifications and email reminders
- Add pagination, advanced filters, and full-text search
- Add integration and end-to-end browser tests
- Add provider usage limits, caching, observability, and audit logs

## Contributors

- Kishore Kumar — repository owner and application developer

## Technical Walkthrough

A 5–8 minute screen recording should demonstrate the live application, repository structure, architecture, deployments, challenges, and lessons learned. Add the publicly accessible Google Drive recording link here before final submission.
