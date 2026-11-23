# Mafkara (مفكرة)

Mafkara is an AI-powered system designer that helps turn software ideas into
structured, connected blueprints. The application is built with TanStack Start,
React, TypeScript, Tailwind CSS, Better Auth, Drizzle ORM, and PostgreSQL.

## Local development

Use Node.js 22 or newer and pnpm.

1. Install dependencies with `pnpm install`.
2. Copy `.env.example` to `.env.local`.
3. Configure the required application and database variables below.
4. Generate and apply the database migration:

   ```sh
   pnpm db:generate
   pnpm db:migrate
   ```

5. Start the development server with `pnpm dev`.

The app runs at `http://localhost:3000`.

## Environment configuration

`DATABASE_URL` is the server-side PostgreSQL URL used by the application. For
Supabase, use a supported PostgreSQL connection method appropriate to the
deployment runtime. `MIGRATION_DATABASE_URL` is optional and should point to
the direct database connection when the runtime URL uses a pooler that should
not run migrations. Drizzle Kit falls back to `DATABASE_URL` when it is omitted.

Set `BETTER_AUTH_SECRET` to a cryptographically random value of at least 32
characters and set `BETTER_AUTH_URL`/`APP_URL` to the canonical application
origin. In production, configure HTTPS origins so Better Auth uses secure
cookies.

Email verification and password recovery require a Resend API key and a
verified sender address in `RESEND_FROM_EMAIL`. Email delivery errors are
reported in the server logs; local account email flows require these values.
OpenRouter variables are included for the upcoming AI phase and are not used by
the current foundation.

All private keys and database credentials must remain server-side. Mafkara
does not use Supabase Auth; Better Auth owns account and session management.
Project content will be sent to the configured AI provider when inference is
introduced.

## Available checks

- `pnpm typecheck` — TypeScript strict type check
- `pnpm check` — Biome formatting and lint checks
- `pnpm test` — Vitest unit tests
- `pnpm build` — production build

## Current implementation stage

The foundation includes email/password account flows, server-validated
dashboard access, workspace/project persistence, an initial validated Mafkara
System Model, and storage of a project's first idea. The conversational AI,
change proposal workflow, and interactive visual canvas are separate upcoming
implementation milestones; they are not yet available.
