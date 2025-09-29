# Ambient Task-Capture Engine

A modern task extraction system that automatically captures tasks from Gmail, Slack, and WhatsApp communications.

## Overview

The Ambient Task-Capture Engine is designed to solve the problem of task management fragmentation by automatically extracting tasks from various communication channels and presenting them in a unified interface. It acts as an intelligent layer on top of existing communication platforms, ensuring that no commitment or action item is ever missed.

## Features

- **Multi-channel Integration**: Connect to Gmail, Slack, and WhatsApp
- **AI-powered Task Extraction**: Automatically identify both explicit and implicit tasks from messages
- **Context Preservation**: Each task includes a link to its source and a concise summary of the surrounding context
- **Unified Task Board**: View and manage all tasks in a single, intuitive interface

## Project Structure

```
esc-act/
├── db/                  # Database scripts and migrations
│   └── schema.sql       # Supabase database schema
├── docs/                # Documentation
│   ├── PRD.md           # Product Requirements Document
│   └── IMPLEMENTATION.md # Technical Implementation Plan
├── src/
│   ├── app/             # Next.js app directory
│   │   └── api/         # API routes
│   │       └── connect/ # OAuth connection endpoints
│   │           └── gmail/
│   │               ├── route.ts           # Gmail connection endpoint
│   │               └── callback/
│   │                   └── route.ts       # Gmail OAuth callback
│   ├── components/      # React components
│   ├── lib/             # Shared libraries
│   ├── services/        # Service modules
│   │   └── gmailService.ts # Gmail processing service
│   └── utils/           # Utility functions
│       └── supabase/    # Supabase client utilities
└── .env.local           # Environment variables (not committed to git)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account
- Google Cloud Platform account with Gmail API enabled
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/esc-ai-dev/esc-act.git
   cd esc-act
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your API keys and configuration.

4. Set up the database:
   Run the schema.sql script in your Supabase SQL Editor.

5. Start the development server:
   ```bash
   npm run dev
   ```

## Documentation

- [Product Requirements Document](docs/PRD.md)
- [Technical Implementation Plan](docs/IMPLEMENTATION.md)

## License

MIT
