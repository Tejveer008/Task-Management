# Getting Started with Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.
It optimizes React for the best performance and generates a fast and efficient bundle.

Your app is ready to be deployed!

### `npm run preview`

Serves the production build locally for testing.

### `npm run lint`

Runs ESLint to check for code style issues.

## Why Vite?

- **Faster builds:** Vite is significantly faster than Create React App (CRA).
- **Optimized for modern browsers:** Uses native ES modules, reducing bundle sizes.
- **Hot Module Replacement (HMR):** Instant updates without full reloads.
- **Lightweight & configurable:** Provides flexibility without unnecessary overhead.

## Learn More

To learn more about Vite, check out the [official documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).

## Deployment

To deploy your Vite app, follow these guides:
- [Vercel Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Netlify Deployment](https://vitejs.dev/guide/static-deploy.html#netlify)
- [GitHub Pages](https://vitejs.dev/guide/static-deploy.html#github-pages)

### Migrating from CRA to Vite
If you're switching from Create React App to Vite, you may need to:
1. Install dependencies: `npm install`
2. Update scripts in `package.json`:
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "preview": "vite preview"
   }
   ```
3. Move your assets to the `public/` folder for static file serving.
4. Update `index.html` to include Vite's script loading method.

Enjoy the speed and efficiency of Vite! 🚀

