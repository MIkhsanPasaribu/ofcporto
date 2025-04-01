# M. Ikhsan Pasaribu Portfolio

A professional portfolio website built with [Next.js](https://nextjs.org) to showcase my skills, projects, and professional experience.

## Features

- **Modern UI/UX**: Clean and responsive design that works on all devices
- **Interactive 3D Elements**: Custom Three.js animations showcasing developer-themed visuals
- **Admin Dashboard**: Secure admin area to manage content (experiences, projects, skills, etc.)
- **Dynamic Content**: All portfolio sections are data-driven and easily updatable
- **Contact Form**: Integrated form for visitors to reach out
- **SEO Optimized**: Built with best practices for search engine visibility

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **3D Visualization**: Three.js with React Three Fiber
- **Authentication**: NextAuth.js for secure admin access
- **Database**: Prisma ORM with your preferred database
- **Deployment**: Ready for deployment on Vercel or other platforms

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 with your browser to see the result.

## Project Structure
- src/app : Main application pages using Next.js App Router
- src/components : Reusable UI components
- src/lib : Utility functions and shared code
- prisma : Database schema and migrations
- public : Static assets including images and 3D models
## Admin Access
The portfolio includes a hidden admin section accessible by clicking the name in the footer 5 times in quick succession. This reveals an admin login link that leads to a secure dashboard for content management.

## Customization
You can customize all aspects of the portfolio by:

1. Updating content through the admin dashboard
2. Modifying the theme colors in the Tailwind configuration
3. Changing the 3D animations in the ThreeScene component
4. Adjusting the layout and components to match your preferences
## Deployment
The easiest way to deploy your portfolio is to use the Vercel Platform from the creators of Next.js.

## License
This project is open source and available under the MIT License .