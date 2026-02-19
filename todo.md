# FranceHRTool - Implementation Plan

## Phase 1: Project Setup
- [x] Initialize Next.js 14 project with TypeScript + Tailwind
- [x] Install dependencies (match EATool package.json)
- [x] Initialize Supabase and shadcn/ui
- [x] Install shadcn components
- [x] Create lib files (utils.ts, supabase.ts, types.ts)

## Phase 2: Database
- [x] Create migration 1: schema
- [x] Create migration 2: seed data
- [ ] Start Supabase, apply migrations, generate types (blocked - Docker not installed)

## Phase 3: Layout + Unenriched Workers
- [x] Create root layout, dashboard layout, Header
- [x] Create useWorkers hook
- [x] Build UnenrichedWorkerList with shadcn Table
- [x] Create dashboard page with tabs

## Phase 4: Enrichment Form + Submit
- [x] Create dropdown hooks (useJobSpecialisations, useEmployeeGroupNames)
- [x] Build ComboboxWithFreeText component
- [x] Build WorkerEnrichmentForm dialog
- [x] Wire up submit logic + toast

## Phase 5: Submitted Workers + Re-submit
- [x] Build SubmittedWorkerList with filters
- [x] Wire up edit/re-submit flow
- [x] Add unenrich button with confirmation dialog

## Phase 6: Polish
- [x] Run lint + typecheck, fix issues (both pass clean)
- [x] Dev server starts successfully (307 redirect to /dashboard works)

## Review

### Summary of Changes
Built the complete L'Oréal HR Tool from scratch as a Next.js 14 + Supabase app.

### Project Structure Created
- **Config files**: package.json, tsconfig.json, tailwind.config.ts, components.json, .eslintrc.json, .env.local
- **Database**: 2 SQL migrations (schema + seed with 10 French workers, lookup tables)
- **Lib**: utils.ts (cn helper), supabase.ts (browser client), types.ts (Worker, EnrichmentFormData, etc.)
- **Hooks**: useWorkers (fetch/submit/unenrich), useJobSpecialisations, useEmployeeGroupNames
- **Components**: Header, UnenrichedWorkerList, SubmittedWorkerList, WorkerEnrichmentForm, WorkerReadOnlyFields, ComboboxWithFreeText
- **Pages**: Root redirect, dashboard with tabs (Unenriched + Submitted)
- **shadcn UI**: button, input, label, select, checkbox, dialog, badge, tabs, table, popover, command, sonner

### Key Patterns
- Matches EATool exactly: Supabase client, hook structure, shadcn New York style
- RLS enabled on all tables with permissive policies (no auth)
- Client-side filtering for submitted workers (OAPASS ID + email)
- Combobox with free text entry for job specialisations and employee groups
- Toast notifications via Sonner on submit/unenrich actions

### Blocker
- Docker Desktop not installed, so `supabase start` can't run locally
- Migrations are ready and will apply automatically when Supabase starts
- `.env.local` is configured for local Supabase (127.0.0.1:54321)
- Can switch to hosted Supabase by updating `.env.local` with project credentials
