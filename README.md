# Vishnu Simha - Portfolio Website

> A modern, responsive portfolio website built with React showcasing my professional experience, projects, and technical skills.

## 🌟 Live Demos

- **GitHub Pages**: https://vishnusimha.github.io/vishnuportfolio
- **Vercel**: https://vishnusimha.github.io/vishnuportfolio/home

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Branch Strategy](#branch-strategy)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This is a comprehensive portfolio website featuring:
- Interactive home page with typing animations
- Detailed project showcase with image galleries
- Technical blog with markdown support
- Professional resume/CV section
- Contact form integration
- Dark/Light theme toggle
- Responsive design for all devices

## ✨ Features

### 🏠 Home Page
- Animated typing effect showcasing roles and skills
- Professional introduction with statistics
- Social media links and contact information
- Technology stack display

### 📁 Projects Section
- Categorized project filtering (Mobile, Full-Stack, IoT, etc.)
- Interactive image galleries with thumbnails
- Detailed project descriptions and tech stacks
- Direct links to GitHub repositories and live demos

### 📝 Blog Section
- Markdown-based blog posts with syntax highlighting
- Categorized content (Android, DevOps, Coding Concepts, etc.)
- Search functionality across all posts
- Code syntax highlighting with copy buttons
- Security: XSS protection with DOMPurify

### 👤 Resume/CV
- Professional resume display
- Downloadable PDF version
- Detailed work experience and education
- Certifications and technical skills

### 📧 Contact
- Interactive contact form
- Email integration with EmailJS
- Professional contact information
- Social media links

## 🛠 Tech Stack

### Frontend
- **React** 19.1.0 - Core framework
- **React Router** 7.5.3 - Navigation
- **React Icons** 5.5.0 - Icon library
- **React Typed** 2.0.12 - Typing animations
- **Framer Motion** 12.7.4 - Animations
- **Lottie React** 2.4.1 - Lottie animations

### Content & Styling
- **Marked** 15.0.11 - Markdown parsing
- **Highlight.js** 11.11.1 - Code syntax highlighting
- **DOMPurify** 3.2.6 - XSS protection
- **Tailwind CSS** 4.1.4 - Utility-first CSS
- **Custom CSS** - Additional styling

### Integrations
- **EmailJS** 4.4.1 - Contact form
- **Formspree** 3.0.0 - Form handling
- **React PDF** 9.2.1 - PDF handling
- **PDF.js** 3.11.174 - PDF viewing

### Development & Build
- **React Scripts** 5.0.1 - Build tools
- **ESLint** - Code linting
- **PostCSS** 8.5.3 - CSS processing
- **Autoprefixer** 10.4.21 - CSS vendor prefixes

## 📂 Project Structure

```
vishnuportfolio/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── portfolio/
│   │   │   ├── Home.js
│   │   │   ├── Projects.js
│   │   │   ├── BlogPost.js
│   │   │   ├── Resume.js
│   │   │   ├── Contact.js
│   │   │   └── Portfolio.js
│   │   └── resume/
│   │       ├── Header.js
│   │       ├── Experience.js
│   │       ├── Education.js
│   │       ├── TechnicalSkills.js
│   │       └── Certifications.js
│   ├── styles/
│   │   ├── Portfolio.css
│   │   ├── index.css
│   │   ├── AppNarrow.css
│   │   ├── Responsivelayout.css
│   │   └── ResumeViewer.css
│   ├── assets/
│   │   ├── work/          # Project images
│   │   ├── blogs/         # Markdown blog posts
│   │   ├── LottieFiles/   # Animation files
│   │   └── *.pdf          # Resume and certificates
│   ├── App.js
│   ├── index.js
│   └── data.js
├── package.json
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vishnusimha/vishnuportfolio.git
   cd vishnuportfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   # Create .env file for any API keys
   # Example: REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## 💻 Development

### Available Scripts

- **`npm start`** - Run development server
- **`npm test`** - Run test suite
- **`npm run build`** - Build for production
- **`npm run deploy`** - Deploy to GitHub Pages
- **`npm run eject`** - Eject from Create React App (⚠️ irreversible)

### Development Guidelines

1. **Code Style**
   - Follow React best practices
   - Use functional components with hooks
   - Maintain consistent naming conventions

2. **Component Structure**
   - Keep components focused and reusable
   - Use proper PropTypes or TypeScript
   - Implement proper error boundaries

3. **Security**
   - All HTML content is sanitized with DOMPurify
   - XSS protection for markdown content
   - Secure API integrations

## 🚀 Deployment

### GitHub Pages (Automated)

The `main` branch is configured for GitHub Pages deployment:

```bash
# Deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the production version (`npm run build`)
2. Deploy to `gh-pages` branch
3. Make it available at: https://vishnusimha.github.io/vishnuportfolio

### Vercel (Branch: `vercelmain`)

The `vercelmain` branch is specifically configured for Vercel deployment:

1. **Push to Vercel branch**
   ```bash
   git checkout vercelmain
   git merge main
   git push origin vercelmain
   ```

2. **Vercel will automatically deploy** from the `vercelmain` branch

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder** to any static hosting service

## 🌿 Branch Strategy

- **`main`** - Primary development branch
- **`vercelmain`** - Vercel deployment branch
- **`gh-pages`** - GitHub Pages deployment (auto-generated)
- **`feature`** - Feature development branch

### Branch Workflow

1. Develop features in `feature` branch
2. Merge to `main` for testing
3. Deploy to GitHub Pages from `main`
4. Merge `main` to `vercelmain` for Vercel deployment

## 🔒 Security

### XSS Protection
- **DOMPurify** sanitizes all HTML content
- Markdown content is sanitized before rendering
- Safe handling of `dangerouslySetInnerHTML`

### Content Security
- All external content is validated
- Image URLs are processed securely
- No unsafe inline scripts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Vishnu Simha Dussa**
- Email: vishnusimha98@gmail.com
- LinkedIn: [linkedin.com/in/vishnusimhadussa](https://www.linkedin.com/in/vishnusimhadussa/)
- GitHub: [github.com/Vishnusimha](https://github.com/Vishnusimha)

---

## 📚 Create React App Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
