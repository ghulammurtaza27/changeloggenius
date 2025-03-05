# ChangelogGenius ✨

A smart, AI-powered tool that turns messy commit histories into beautiful, user-friendly changelogs.

## 🔍 The Problem We're Solving

As developers, we've all been there - release day approaches and someone asks "what's in this update?" Then comes the tedious process of combing through commits, trying to translate technical changes into something users will understand.

ChangelogGenius automates this entire workflow, saving you time and creating better changelogs.

## 🚀 How It Works

![Landing Page](/public/landing-page.png)

1. **Connect your GitHub repo** - Just paste your repository URL
2. **Let AI analyze your commits** - Our AI reads commit messages and code diffs
3. **Edit and publish** - Review, tweak, and publish your changelog

## ✅ Key Features

- **AI-powered summaries** that convert technical commits into user-friendly language
- **Smart categorization** of changes (features, fixes, improvements)
- **Breaking change detection** to highlight important updates
- **Clean, minimal public changelog** that your users will love

## 📸 Screenshots

| Connect Repository | Edit Changelog | Public View |
|:---:|:---:|:---:|
| ![Add Repository](/public/add-a-repository.png) | ![Edit Changelog](/public/edit-chagelog.png) | ![Public View](/public/changelog-public-view.png) |

## 🛠️ Tech Stack & Architecture

When building ChangelogGenius, I wanted to create something both powerful and pleasant to work with. Here's what powers the app:

### 🖥️ Frontend
- **React 18 + TypeScript** - Type-safe components with excellent DX
- **Vite** - Lightning-fast builds and hot module replacement
- **TailwindCSS + Shadcn UI** - Beautiful, accessible components without the bloat
- **React Router** - Clean client-side navigation

### ⚙️ Backend
- **Express.js** - Lightweight but powerful API server
- **Prisma** - Type-safe database access with migrations
- **PostgreSQL** - Reliable, open-source database

### 🧠 AI & Integration
- **Google's Gemini 1.5 Flash** - Analyzes commits and generates human-friendly descriptions
- **GitHub REST API** - Direct integration for maximum flexibility

### 🤔 Why I Made These Choices

I wanted ChangelogGenius to be both powerful for developers and accessible to non-technical team members:

1. **Direct GitHub API calls** instead of libraries
   - Precise control over rate limiting and error handling
   - Better flexibility for custom requests

2. **Gemini over other AI models**
   - Excellent code understanding at a fraction of the cost
   - Free tier is perfect for this use case

3. **Focused workflow**
   - Limited to 10 commits per changelog
   - Keeps the UI snappy and changelogs focused

4. **JSON-structured AI responses**
   - Forces consistent, parseable output
   - Easily displayed in the UI

5. **Shadcn + Tailwind**
   - Polished look without reinventing the wheel
   - Small bundle size and excellent performance

The architecture prioritizes simplicity and developer experience, making it easy to extend with new features as needed.

## 💻 Running Locally

```bash
# Prerequisites: Node.js >= 18 and PostgreSQL

# Clone and install
git clone https://github.com/ghulammurtaza27/changeloggenius
cd changeloggenius
npm install

# Set up environment
cp .env.example .env
# Add your GitHub token Gemini API key and Database URL to .env

# Start the app
npm run dev
npm run server  # In a separate terminal
```

The app will be available at http://localhost:8080

