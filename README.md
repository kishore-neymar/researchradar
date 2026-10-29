# ResearchRadar

AI-powered research opportunity discovery system — MVP/mock website for the PRD assignment.

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

The app currently uses mock data and is ready to connect to real APIs/database later.

## File uploads

Authenticated users can upload PDF, Word, JPEG, and PNG files up to 5 MB from `/uploads`. Uploaded files are stored securely on the server, owned by the authenticated user, and available through the upload API.

## Google authentication

1. Create a Google OAuth 2.0 Web Client and add the application's frontend origin.
2. Set `GOOGLE_CLIENT_ID` in `server/.env` and `NEXT_PUBLIC_GOOGLE_CLIENT_ID` in the Next.js environment.
3. Google credentials are verified server-side before a ResearchRadar JWT is issued.
