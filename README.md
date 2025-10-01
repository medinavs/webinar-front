# webinar-front

## Instructions for Running the Project Locally

### Prerequisites

- Node.js 22+
- (Optional) Docker for external services

### Installation

```sh
git clone https://github.com/medinavs/webinar-front.git
cd webinar-front
npm install
```

### Environment Setup

- Create a `.env` file in the root directory and configure necessary environment variables.
- See `src/constants/environments/` for references.

### Start the Application

```sh
npm run dev
```

- The app will be available at `http://localhost:3000`

---

## Architecture Decisions and Assumptions

- **Next.js (App Router)** for SSR, routing, and API routes.
- **TypeScript** for type safety.
- **React Query** for data fetching and caching.
- **Axios** for HTTP requests.
- **Validation**: Zod schemas for forms and APIs.
- **Authentication**: Custom hooks and middleware for session management.
- **Reusable UI components**: Located in `src/components/common` and `src/components/ui`.
- **Service-Oriented Architecture (SOA)**: The application is organized in independent, service-based modules for scalability and maintainability.
- **Internationalization support**: Language-based routing and dictionary utilities enable multi-language experiences.

---

## Project Structure

```
src/
├── app/                         # Next.js app router structure
│   ├── (auth-scope)/            # Auth pages (sign-in, sign-up)
│   ├── [lang]/                  # Language-based routing
│   │   ├── (homepage)/          # Homepage per language
│   │   ├── catalog/             # Webinar catalog
│   │   ├── me/                  # User profile pages
│   │   └── settings/            # User settings
├── assets/                      # Static assets
├── components/                  # Shared and domain-specific components
│   ├── common/                  # Reusable UI components
│   └── ui/                      # UI primitives
├── constants/                   # App-wide constants
├── hooks/                       # Custom React hooks
├── instances/                   # API/Auth instances (API instance used to manage service classes)
├── lib/                         # Utility libraries
├── providers/                   # Context providers
├── services/                    # API service layers
├── styles/                      # Global styles
├── types/                       # Shared TypeScript types
└── utils/                       # Utility functions
```

---

## Main Features

- **Authentication**

  - Sign-in and sign-up pages
  - Session management

- **Webinars**

  - List webinars by category, text, and other filters
  - View webinar details
  - Register for webinars

- **Categories**

  - List Categories
  - Filter webinars by category

- **User Profile**

  - View registered webinars + time of registration + registrations count

- **Settings**
  - Application settings (language, user edit)

---

## Tradeoffs

- Whenever possible, features are implemented using a hybrid SSR/client-side model to balance performance, SEO, and interactivity.
- Avatar images are removed from webinar cards in the catalog for initial SSR, ensuring fast load and SEO; avatars are not displayed when filters are applied, as filtered results are rendered server-side.
- Some UI features are simplified to prioritize SSR and scalability over rich client interactivity in catalog views.

---

## Improvements and Next Steps

- Add automated unit and integration tests.
- Implement role-based access control.
- Add internationalization for more languages.
- Improve accessibility and mobile responsiveness.

---

## Additional Notes

- Modular and scalable patterns for maintainability.
- All UI components are reusable and typed.
- Data fetching is optimized with React Query and SSR (hybrid).
