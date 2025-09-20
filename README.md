# MeetAI - AI Agent Platform

A SaaS platform for AI-powered meetings and interactions built with Next.js 14, Better Auth, Neon DB, and more.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Neon (PostgreSQL)
- **Authentication**: Better Auth
- **ORM**: Drizzle
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Fonts**: Geist

## Getting Started

### Prerequisites

1. Node.js 18+
2. Neon Database account
3. Better Auth account
4. GitHub OAuth App
5. Google Cloud Project with OAuth 2.0 configured

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database
DATABASE_URL=your_neon_db_url

# Better Auth
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=http://localhost:5000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/auth

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

You'll need to:

1. Create a Neon database and get the connection URL
2. Set up a Better Auth account and get credentials
3. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps)
4. Set up Google OAuth 2.0 credentials (Google Cloud Console → APIs & Services → Credentials)

### Installation

```bash
# Install dependencies
npm install

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:5000` to see the application.

## Database Management

```bash
# Push schema changes
npm run db:push

# Open Drizzle Studio
npm run db:studio
```

## Test Credentials

For testing purposes, use these credentials:

```
Email: test@test.com
Password: password
```

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable UI components
│   ├── lib/             # Utility functions
│   ├── modules/         # Feature modules
│   └── styles/          # Global styles
├── drizzle/             # Database schema and migrations
└── public/              # Static assets
```

## Key Features

- [x] Authentication (Email, Google, GitHub)
- [x] PostgreSQL Database with Neon
- [x] Form Validation with Zod
- [x] Responsive UI with Tailwind
- [x] Type-safe Database Queries
- [ ] AI Agent Integration
- [ ] Real-time Updates
- [ ] Payment Integration

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database changes
npm run db:studio    # Open database UI
```

## Libraries & Dependencies

### Core

- `next`: ^14.0.0
- `react`: ^18.2.0
- `better-auth`: latest
- `@neondatabase/serverless`: ^1.0.0
- `drizzle-orm`: latest

### UI & Styling

- `@radix-ui/*`: Various UI primitives
- `tailwindcss`: ^3.3.0
- `@hookform/resolvers`: ^5.2.1
- `zod`: ^4.1.5
- `geist`: ^1.5.1

### Development

- `typescript`: ^5.0.0
- `eslint`: ^8.0.0
- `drizzle-kit`: latest

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
