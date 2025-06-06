# Intercom AI Admin Dashboard

A professional, responsive AI-enhanced admin panel UI inspired by Intercom's customer support platform. This project is a frontend implementation that showcases a modern admin interface with AI-powered features for customer support and user management.


## Features

- **Modern UI**: Clean, professional design with smooth animations and transitions
- **Responsive Layout**: Fully responsive for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Dashboard**: Overview with key metrics and recent conversations
- **Users Management**: Searchable and filterable user table with sorting options
- **Messaging Interface**: Two-panel chat UI with AI-powered suggested replies
- **Settings**: Customizable appearance settings

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Date Formatting**: date-fns
- **UI Components**: Custom components with Headless UI

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kumaran1223/admin-panel.git
   cd admin-panel
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── components/         # React components
│   ├── layout/         # Layout components (Sidebar, Navbar)
│   └── ui/             # UI components (Dashboard, UserTable, etc.)
├── context/            # React context providers
├── data/               # Dummy data for users and conversations
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global styles
└── types/              # TypeScript type definitions
```

## Deployment

This project can be easily deployed to Netlify:


### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kumaran1223/admin-panel)

## Live Demo

Check out the live demo: https://fancy-piroshki-bbd2f1.netlify.app/
