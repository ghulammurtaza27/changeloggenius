# ChangelogGenius

An AI-powered changelog generator that helps developers maintain clean and organized changelogs with minimal effort.

## Overview

ChangelogGenius solves two major challenges in changelog creation:
1. Automatically aggregates and analyzes commits over any time period
2. Uses AI to generate human-readable changelog entries that are relevant to end-users

## Screenshots

### Landing Page
![Landing Page](/public/landing-page.png)

### Developer Dashboard - Add Repository
![Add Repository](/public/add-a-repository.png)

### Edit Changelog
![Edit Changelog](/public/edit-chagelog.png)

### Add Changelog Entry
![Add Changelog Entry](/public/add-changelog-entry.png)

### Public Changelog View
![Public Changelog View](/public/changelog-public-view.png)

## Technical & Product Decisions

### Architecture
- **Frontend**: React + TypeScript + Vite
  - Used for rapid development and excellent developer experience
  - TypeScript for type safety and better maintainability
  - Vite for fast builds and hot module replacement

- **UI Framework**: TailwindCSS + Shadcn UI
  - Provides a clean, modern, and responsive design
  - Component-based architecture for consistency
  - Dark mode support out of the box
  - Accessible components following WAI-ARIA standards

- **Backend**: Express + Prisma + PostgreSQL
  - Express for a lightweight and flexible API
  - Prisma for type-safe database operations
  - PostgreSQL for robust data storage and relationships

- **AI Integration**: Google's Generative AI
  - Used for converting technical commit messages into user-friendly changelog entries
  - Categorizes changes (features, fixes, improvements)
  - Identifies breaking changes
  - Summarizes technical details in a user-friendly way

### Product Design Choices

1. **Three-Step Workflow**
   - Connect GitHub Repository
   - Generate Changelog with AI
   - Edit and Publish
   - Each step has clear status indicators and helpful guidance

2. **Developer Experience**
   - One-click GitHub repository connection
   - Automatic commit analysis
   - AI-powered content generation
   - Manual editing capabilities for fine-tuning
   - Preview before publishing

3. **End-User Experience**
   - Clean, minimal changelog display
   - Categorized entries for easy scanning
   - Highlighted breaking changes
   - Version and date organization

## Setup & Running the App

1. **Prerequisites**
   ```bash
   Node.js >= 18
   PostgreSQL
   ```

2. **Environment Setup**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd changeloggenius

   # Install dependencies
   npm install

   # Set up environment variables
   cp .env.example .env
   # Fill in your database and API keys
   ```

3. **Database Setup**
   ```bash
   # Run database migrations
   npx prisma migrate dev
   ```

4. **Running the App**
   ```bash
   # Start the development server
   npm run dev

   # In a new terminal, start the backend
   npm run server
   ```

   The app will be available at:
   - Frontend: http://localhost:8080
   - Backend: http://localhost:3000

## AI Tools Used

1. **Google's Generative AI (Gemini Pro)**
   - Primary AI model for changelog generation
   - Processes commit messages and generates user-friendly descriptions
   - Identifies breaking changes and categorizes updates

2. **GitHub API Integration**
   - Fetches repository data and commit history
   - Analyzes commit patterns and changes

## Development Status

- [x] Developer-facing changelog generation tool
- [x] Public-facing changelog website
- [x] AI-powered commit analysis
- [x] Database integration
- [x] User interface and styling
- [x] Screen recording (see screenshots)

## Expected Completion Date

The project is feature complete.

## Questions?

For any questions or clarifications, please reach out to [Your Contact Info].

