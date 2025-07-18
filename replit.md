# WorkPass Australia - Construction Worker Passport Platform

## Overview

WorkPass Australia is a comprehensive full-stack web application designed as a digital passport system for construction workers in Australia. The platform enables users to store, manage, and share their construction credentials, certifications, and qualifications while providing job matching and compliance tracking capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for construction industry branding
- **Form Management**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Authentication**: OpenID Connect (OIDC) integration with Replit Auth
- **Session Management**: Express sessions with PostgreSQL storage
- **File Handling**: Multer for document uploads with file type validation

### Database Layer
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Connection**: Neon serverless driver with WebSocket support

## Key Components

### Authentication System
- **Provider**: Replit OIDC integration
- **Flow**: Standard OAuth 2.0 / OpenID Connect flow
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **User Management**: Automatic user creation/update on successful authentication

### Document Management
- **Upload System**: Drag-and-drop interface with progress tracking
- **File Types**: PDF, JPG, JPEG, PNG with 10MB size limit
- **Categorization**: Automatic document classification (Safety, Trade Skills, Medical, Licenses)
- **Storage**: Server-side file storage with metadata tracking

### Work Readiness Scoring
- **Algorithm**: Composite scoring based on credential completeness and validity
- **Categories**: Safety certifications, trade qualifications, medical clearances, licenses
- **Visualization**: Circular progress meters with color-coded status indicators

### Job Application System
- **Matching**: AI-powered job matching based on user credentials and preferences
- **Application Tracking**: Complete application lifecycle management
- **Integration**: Employer job posting and candidate discovery

## Data Flow

### User Registration Flow
1. User initiates registration through OIDC provider
2. Email/phone verification via OTP system
3. Profile completion with role and trade selection
4. Document upload and verification process
5. Work readiness score calculation and display

### Credential Management Flow
1. Document upload with automatic categorization
2. Metadata extraction and storage
3. Expiration tracking and reminder system
4. Verification status updates
5. Compliance reporting

### Job Matching Flow
1. User profile and credential analysis
2. Job requirement matching algorithm
3. Recommendation generation
4. Application submission and tracking
5. Employer notification and response handling

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI component primitives
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### Authentication
- **openid-client**: OIDC client implementation
- **passport**: Authentication middleware
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **vite**: Build tool and development server
- **tailwindcss**: Utility-first CSS framework
- **tsx**: TypeScript execution for development
- **esbuild**: JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Server**: Express with Vite middleware for HMR
- **Database**: Development PostgreSQL instance
- **File Storage**: Local filesystem
- **Authentication**: Development OIDC configuration

### Production Deployment
- **Build Process**: Vite production build + esbuild server bundling
- **Database**: Production PostgreSQL (Neon)
- **File Storage**: Server filesystem (expandable to cloud storage)
- **Authentication**: Production OIDC with secure session configuration
- **Environment**: Node.js production server with proper error handling

### Configuration Management
- **Environment Variables**: Database URL, session secrets, OIDC configuration
- **Schema Deployment**: Drizzle migrations for database updates
- **Static Assets**: Vite-optimized frontend bundle serving
- **Session Security**: Secure cookies with appropriate expiration policies