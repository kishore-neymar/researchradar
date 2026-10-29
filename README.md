# ResearchRadar

AI-powered research opportunity discovery system — MVP/mock website for the PRD assignment.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

The app currently uses mock data and is ready to connect to real APIs/database later.

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
