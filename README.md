# Modern Animated Portfolio - Rashid Khan

A stunning, modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and GSAP animations. Features smooth animations, dark mode support, responsive design, and a clean, professional layout.

## 🚀 Features

- **Modern Design**: Clean, professional UI with glassmorphism effects
- **Smooth Animations**: GSAP-powered animations with scroll triggers
- **Dark Mode**: Seamless theme switching with system preference detection
- **Responsive**: Fully responsive design for all device sizes
- **Performance**: Optimized with Next.js 15 and Turbopack
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock Animation Platform)
- **Motion**: Framer Motion for additional micro-interactions
- **Icons**: Lucide React
- **Fonts**: Inter & JetBrains Mono

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

3. **Run the development server**:

    ```bash
    npm run dev
    ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with custom animations
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main home page
├── components/
│   ├── Header.tsx           # Navigation header with animations
│   └── Footer.tsx           # Footer with contact info
├── sections/
│   ├── Hero.tsx             # Hero section with typewriter effect
│   ├── About.tsx            # About section with stats
│   ├── Skills.tsx           # Animated skills showcase
│   ├── Projects.tsx         # Project portfolio with filters
│   └── Experience.tsx       # Timeline-based experience
├── constants/
│   ├── profile.ts           # Personal information
│   ├── skills.ts            # Technical skills data
│   ├── projects.ts          # Project portfolio data
│   └── experience.ts        # Work experience data
└── utils/
    └── animations.ts        # GSAP animation utilities
```

## 🎨 Animations & Effects

### GSAP Animations

- **Scroll-triggered animations** for section reveals
- **Typewriter effect** for dynamic text
- **Stagger animations** for list items
- **Parallax scrolling** for background elements
- **Magnetic hover effects** for interactive elements

### CSS Animations

- **Gradient animations** for backgrounds
- **Floating animations** for decorative elements
- **Smooth transitions** for theme switching
- **Glassmorphism effects** for modern UI elements

## 🎨 Customization

### Personal Information

Update your details in the constants files:

- `src/constants/profile.ts` - Personal info, contact details, social links
- `src/constants/skills.ts` - Technical skills and proficiency levels
- `src/constants/projects.ts` - Portfolio projects with details
- `src/constants/experience.ts` - Work history and achievements

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Change fonts in `src/app/layout.tsx`
- **Animations**: Customize animations in `src/utils/animations.ts`

### Content Sections

Each section is modular and can be easily modified:

- Add/remove sections in `src/app/page.tsx`
- Customize section content in respective component files
- Adjust animations and styling per section

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🌙 Dark Mode

Automatic dark mode support with:

- System preference detection
- Manual toggle in header
- Smooth transitions between themes
- Dark mode optimized colors and gradients

## ⚡ Performance

- **Next.js 15** with Turbopack for fast builds
- **Image optimization** with Next.js Image component
- **Font optimization** with next/font
- **Code splitting** for optimal loading
- **Prefetching** for smooth navigation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with one click

### Other Platforms

```bash
npm run build
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Khanr7433/portfolio/issues).

## 📧 Contact

- **Email**: khan.rashid.7433@gmail.com
- **LinkedIn**: [Rashid Khan](https://www.linkedin.com/in/rashid-khan-820628266)
- **GitHub**: [Khanr7433](https://github.com/Khanr7433)

---

Made with ❤️ by [Rashid Khan](https://github.com/Khanr7433)
