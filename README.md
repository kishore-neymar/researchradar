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
