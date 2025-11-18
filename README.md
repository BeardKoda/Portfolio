# Beardkoda Portfolio Website

A premium personal portfolio website built with Next.js 15, TailwindCSS v4, and Anime.js.

## Features

- 🎨 Minimalist, futuristic design with clean engineering aesthetic
- ✨ Smooth animations powered by Anime.js
- 📱 Fully responsive and mobile-first
- 🚀 Optimized for performance and SEO
- 🎯 Server Components by default, Client Components for interactivity

## Tech Stack

- **Next.js 15** - App Router
- **TailwindCSS v4** - Styling
- **Anime.js** - Animations
- **TypeScript** - Type safety

## Getting Started

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx          # Root layout with Navbar and Footer
  page.tsx            # Main page with all sections
  globals.css         # Global styles and fonts
  (sections)/         # Section components
    Hero.tsx
    About.tsx
    Skills.tsx
    Projects.tsx
    Experience.tsx
    Contact.tsx
  api/
    contact/route.ts  # Contact form API endpoint

components/           # Reusable components
  Navbar.tsx
  Footer.tsx
  AnimatedText.tsx
  ProjectCard.tsx
  Timeline.tsx
```

## Customization

- Update project data in `app/(sections)/Projects.tsx`
- Modify experience timeline in `app/(sections)/Experience.tsx`
- Adjust skills in `app/(sections)/Skills.tsx`
- Customize colors in `tailwind.config.ts`
- Add your avatar image to `public/avatar.jpg`

## Deployment

The project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

## License

MIT

