# ✨ Modern Animated Portfolio - Rashid Khan

A stunning, modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and GSAP animations. Features smooth animations, dark mode support, responsive design, and a comprehensive showcase of my development projects.

## 🌐 Live Demo

**[🚀 View Live Portfolio](https://portfolio-rashid-khan.vercel.app)**

## 🚀 Features

- **Modern Design**: Clean, professional UI with glassmorphism effects and gradient animations
- **Smooth Animations**: GSAP-powered animations with scroll triggers and typewriter effects
- **Dark Theme**: Beautiful dark theme design optimized for modern aesthetics
- **Responsive**: Fully responsive design optimized for all device sizes
- **Performance**: Optimized with Next.js 15 and Turbopack for fast loading
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Project Showcase**: Dynamic project filtering with major/minor categorization
- **Interactive Sections**: Hero, About, Skills, Tools, Projects, Experience, Education, and Contact

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: GSAP (GreenSock Animation Platform) with ScrollTrigger
- **Icons**: Lucide React
- **Fonts**: Inter & JetBrains Mono (Google Fonts)
- **Analytics**: Vercel Analytics & Speed Insights
- **Form Handling**: Custom contact form with validation

## 📦 Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Khanr7433/portfolio.git
    cd portfolio
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory for your environment configuration:

    ```bash
    # Create environment file
    cp .env
    # OR create manually
    touch .env
    ```

    Add the following variables to your `.env` file:

    ````env
    # Email Service Configuration (Required for Contact Form)
    # Sign up at https://www.emailjs.com/ to get these values
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

    **Environment Variables Setup Guide:**

    1. **Email Service (EmailJS):**
       - Visit [EmailJS](https://www.emailjs.com/) and create a free account
       - Create an email service and template
       - Copy the Service ID, Template ID, and Public Key
       - Paste them in your `.env` file


    ```bash
    npm run dev
    ````

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
portfolio/
├── .gitignore              # Git ignored files (.env.local is ignored)
├── .env                    # Environment variables
├── .prettierignore         # Prettier ignored files
├── .prettierrc             # Prettier configuration
├── eslint.config.mjs       # ESLint configuration
├── next-env.d.ts           # Next.js TypeScript declarations
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependency lock file
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── public/                 # Static assets
└── src/
    ├── app/
    │   ├── all-projects/
    │   │   ├── layout.tsx     # All projects page layout
    │   │   ├── loading.tsx    # Loading component for projects page
    │   │   └── page.tsx       # Complete projects showcase page
    │   ├── globals.css        # Global styles with custom animations
    │   ├── layout.tsx         # Root layout with metadata & fonts
    │   └── page.tsx           # Main home page with all sections
    ├── components/
    │   ├── Footer.tsx         # Footer with social links & contact
    │   ├── Header.tsx         # Navigation header with active states
    │   └── LoadingSpinner.tsx # Reusable loading spinner component
    ├── sections/
    │   ├── About.tsx          # About section with animated stats
    │   ├── ContactForm.tsx    # Contact form with validation
    │   ├── Education.tsx      # Educational background
    │   ├── Experience.tsx     # Professional experience timeline
    │   ├── Hero.tsx           # Hero section with typewriter effect
    │   ├── Projects.tsx       # Featured projects showcase
    │   ├── Skills.tsx         # Technical skills with progress bars
    │   └── Tools.tsx          # Development tools and technologies
    ├── constants/
    │   ├── education.ts       # Educational qualifications data
    │   ├── experience.ts      # Work experience data
    │   ├── profile.ts         # Personal information & social links
    │   ├── projects.ts        # Complete project portfolio (major/minor)
    │   ├── skills.ts          # Technical skills & soft skills data
    │   └── tools.ts           # Development tools & software
    └── utils/
        └── animations.ts      # GSAP animation utilities and helpers
```

## 📊 Portfolio Highlights

### Project Categories

- **5 Major Projects**: Complex full-stack applications with advanced features
- **4 Minor Projects**: Frontend applications and utility tools
- **Technologies**: MERN Stack, Next.js, Django, TypeScript, and more

### Key Sections

- **Hero**: Dynamic typewriter effect with multiple titles
- **About**: Personal introduction with animated statistics
- **Skills**: Technical proficiencies with visual indicators
- **Tools**: Development environment and software expertise
- **Projects**: Random featured selection with "View All" functionality
- **Experience**: Professional timeline with achievements
- **Education**: Academic background and certifications
- **Contact**: Interactive form for professional inquiries

## 🎨 Animations & Effects

### GSAP Animations

- **Scroll-triggered reveals** for all sections
- **Typewriter effect** for dynamic hero text
- **Stagger animations** for project cards and skill items
- **Parallax effects** for background elements
- **Hover animations** for interactive elements

### CSS Animations

- **Gradient animations** for hero background
- **Floating decorative elements**
- **Smooth theme transitions**
- **Glassmorphism effects** throughout the interface
- **Custom scrollbar styling**

## 🎨 Customization

### Personal Information

Update your details in the constants files:

- `src/constants/profile.ts` - Personal info, contact details, social links
- `src/constants/skills.ts` - Technical skills and proficiency levels
- `src/constants/tools.ts` - Development tools and software
- `src/constants/projects.ts` - Portfolio projects (major/minor categories)
- `src/constants/experience.ts` - Work history and achievements
- `src/constants/education.ts` - Educational background

### Styling & Theming

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Change typography in `src/app/layout.tsx`
- **Animations**: Customize GSAP animations in section components
- **Layout**: Adjust section order in `src/app/page.tsx`

## 📱 Responsive Design

Fully responsive with optimized breakpoints:

- **Mobile**: 320px - 768px (Touch-optimized navigation)
- **Tablet**: 768px - 1024px (Adjusted grid layouts)
- **Desktop**: 1024px+ (Full feature experience)
- **Large Screens**: 1440px+ (Enhanced spacing and typography)

## � Design & Theming

Current implementation features:

- **Fixed Dark Theme**: Optimized dark theme design
- **Glassmorphism Effects**: Modern glass-like UI elements
- **Gradient Animations**: Dynamic background gradients
- **Responsive Design**: Optimized for all screen sizes
- **Custom Scrollbar**: Styled scrollbars for better aesthetics

_Note: Theme switching functionality is prepared but not yet implemented. The portfolio currently uses a fixed dark theme._

## ⚡ Performance Optimizations

- **Next.js 15** with Turbopack for ultra-fast development
- **Image optimization** with Next.js Image component
- **Font optimization** with Google Fonts integration
- **Code splitting** for optimal bundle sizes
- **Prefetching** for smooth page transitions
- **GSAP optimization** with proper cleanup and triggers

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect repository to Vercel
3. Automatic deployments on push to main branch
4. Built-in analytics and performance monitoring

### Manual Deployment

```bash
npm run build
npm start
```

## 📈 Analytics & Monitoring

- **Vercel Analytics**: User behavior and page views
- **Speed Insights**: Performance monitoring and optimization
- **SEO Optimization**: Meta tags, Open Graph, and structured data

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # TypeScript type checking
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Khanr7433/portfolio/issues).

### Development Guidelines

- Follow TypeScript best practices
- Maintain responsive design principles
- Ensure accessibility standards
- Test animations across different devices
- Update constants files for any content changes

## 📧 Contact

- **Email**: [khan.rashid.7433@gmail.com](mailto:khan.rashid.7433@gmail.com)
- **LinkedIn**: [Rashid Khan](https://www.linkedin.com/in/rashid-khan-820628266)
- **GitHub**: [Khanr7433](https://github.com/Khanr7433)
- **Portfolio**: [portfolio-rashid-khan.vercel.app](https://portfolio-rashid-khan.vercel.app)

---

Built with ❤️ by [Rashid Khan](https://github.com/Khanr7433) | Full Stack Developer
