# Clara AI - Voice Booking Platform

A modern UI for Clara AI, an AI-powered voice booking platform that manages appointments, schedules meetings, and handles customer inquiries 24/7.

## Features

### Landing Page
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **About Section**: Information about Clara AI's capabilities
- **How It Works**: Step-by-step explanation of the platform
- **CTA Section**: "Ready to Let Clara Handle Your Calls?" section
- **Footer**: Complete footer with links and social media

### Dashboard
- **Collapsible Sidebar**: Left sidebar that can be collapsed/expanded via button
- **Top Bar**: Search, notifications dropdown, and user avatar dropdown
- **Dashboard Page**: Overview with stats, recent bookings, and activity feed
- **Bookings Page**: Complete booking management with table view
- **Alerts Page**: Notification center with different alert types
- **Customers Page**: Customer database with detailed information

## Color Scheme

### Primary Colors
- Deep Blue: `#1E1E5F`
- Purple: `#7B4FFF`
- Scaffold (Background): `#050517`
- Card: `#15152A`
- Bar Background: `#101024`

### Text Colors
- Primary Text: `rgba(255, 255, 255, 0.95)`
- Secondary Text: `rgba(255, 255, 255, 0.75)`
- Muted Text: `rgba(255, 255, 255, 0.55)`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
clara-ai/
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── page.tsx        # Dashboard home
│   │   ├── bookings/       # Bookings page
│   │   ├── alerts/         # Alerts page
│   │   ├── customers/      # Customers page
│   │   └── layout.tsx      # Dashboard layout
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/
│   ├── dashboard/          # Dashboard components
│   │   ├── Sidebar.tsx     # Collapsible sidebar
│   │   └── TopBar.tsx      # Top navigation bar
│   └── landing/            # Landing page components
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── HowItWorks.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
└── contexts/
    └── SidebarContext.tsx  # Sidebar state management
```

## Technologies Used

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons
- **React Context** - State management for sidebar

## Features Implemented

✅ Landing page with all sections
✅ Responsive design
✅ Dashboard with collapsible sidebar
✅ Top bar with notifications and user dropdown
✅ Four dashboard pages (Dashboard, Bookings, Alerts, Customers)
✅ Modern UI with custom color scheme
✅ Smooth animations and transitions
✅ Interactive dropdowns and menus

## Next Steps

This is a UI-only implementation. Future enhancements could include:
- Backend API integration
- Real-time data updates
- Authentication system
- Form handling and validation
- Calendar integration
- Analytics and reporting
