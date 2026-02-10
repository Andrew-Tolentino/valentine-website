# 💕 Valentine's Day Website

A romantic, minimal Valentine's Day website built with React and TypeScript.

## Features

- 💝 Interactive "Will you be my Valentine?" prompt
- 🎯 Playful "No" button that moves away when hovered
- ⏰ Countdown timer to Valentine's Day
- 💖 Special Valentine's Day message when the day arrives
- 💾 Uses localStorage to remember the user's response
- 📱 Fully responsive design
- 🎨 Beautiful Valentine's Day color scheme

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Deploy to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

1. Create a new repository on GitHub

2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

3. Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```

4. In your GitHub repository:
   - Go to Settings > Pages
   - Under "Build and deployment", select "GitHub Actions" as the source

5. Push the workflow file and your site will auto-deploy!

### Option 2: Manual Deploy

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` folder

3. Push the `dist` folder to a `gh-pages` branch:
```bash
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

4. In GitHub repository settings:
   - Go to Settings > Pages
   - Select `gh-pages` branch as source

## Project Structure

```
valentine-website/
├── src/
│   ├── App.tsx          # Main component
│   ├── App.css          # Component styles
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
└── README.md
```

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3
- localStorage API

## License

MIT
