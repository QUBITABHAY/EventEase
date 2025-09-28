# 🎯 EventEase

> **The Ultimate Event Management Platform for Modern Organizations**

EventEase is a cutting-edge, full-stack event management platform built with modern web technologies. Designed to streamline event creation, management, and attendee engagement, EventEase transforms how organizations handle events from conception to completion.

[![Astro](https://img.shields.io/badge/Astro-Latest-FF5D01?style=for-the-badge&logo=astro)](https://astro.build/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Latest-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## ✨ Key Features

### 🎯 **Smart Event Management**
- **Intuitive Dashboard**: Modern, responsive interface built with Astro and component libraries
- **Real-time Updates**: Live event statistics and attendee management
- **Advanced Analytics**: Comprehensive insights and reporting tools

### 🚀 **Modern Technology Stack**
- **Lightning Fast**: Powered by Astro for optimal performance and build times
- **Type-Safe**: Built with TypeScript for enhanced developer experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database Agnostic**: Prisma ORM for seamless database operations

### 🔐 **Enterprise-Grade Security**
- **JWT Authentication**: Secure user authentication and authorization
- **Data Protection**: Industry-standard security practices
- **Role-Based Access**: Granular permission system for different user types

### 📱 **User Experience First**
- **Static-First Performance**: Astro's islands architecture for optimal loading
- **Component Integration**: Seamless integration of React components when needed
- **Accessibility**: WCAG compliant design patterns
- **SEO Optimized**: Built-in SEO features with Astro's static generation

---

## 🏗️ Architecture & Tech Stack

### **Frontend**
```
├── Astro                 # Static site generator with islands architecture
├── TypeScript            # Type-safe JavaScript superset
├── Tailwind CSS 3.4.17   # Utility-first CSS framework
├── React Components      # Interactive components when needed
├── GSAP                  # Animation library
└── Astro Routing         # File-based routing system
```

### **Backend**
```
├── Node.js               # JavaScript runtime
├── Express.js            # Web application framework
├── Prisma ORM            # Database toolkit
├── JWT                   # Authentication tokens
└── RESTful APIs          # Modern API design
```

### **Development Tools**
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git with GitHub
- **Deployment Ready**: Production-optimized builds

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** for version control

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Yashsingh045/EventEase.git
cd EventEase

# 2. Install client dependencies
cd client
npm install

# 3. Install server dependencies
cd ../server
npm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# 5. Run database migrations
npx prisma migrate dev

# 6. Start development servers
# Terminal 1: Client (Astro)
cd client && npm run dev

# Terminal 2: Server (Node.js + Express)
cd server && npm run dev
```

### 🌐 Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database Studio**: http://localhost:5555 (run `npx prisma studio`)

---

## 📁 Project Structure

```
EventEase/
├── client/                 # Astro frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components (Astro & React)
│   │   ├── pages/          # Route pages (file-based routing)
│   │   ├── layouts/        # Page layouts
│   │   ├── lib/            # Utility functions
│   │   └── assets/         # Static resources
│   ├── public/             # Public assets
│   └── package.json
│
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Business logic
│   │   ├── models/         # Database models
│   │   └── middleware/     # Custom middleware
│   ├── prisma/             # Database schema
│   └── package.json
│
└── README.md              # Project documentation
```

---

## 🎨 Component Library & Design System

EventEase uses a modern component architecture approach:

- **Astro Components**: Static-first component system
- **React Islands**: Interactive components when needed
- **Tailwind CSS**: Utility-first styling
- **GSAP Animations**: Smooth animations and transitions
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety across components

---

## 🔧 Development Workflow

### **Available Scripts**

**Client (Astro)**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

**Server (Node.js)**
```bash
npm run dev          # Start with nodemon
npm start            # Start production server
npm run migrate      # Run database migrations
npm run studio       # Open Prisma Studio
```

---

## 🌟 Advanced Features

### **Performance Optimizations**
- **Islands Architecture**: Only hydrate interactive components
- **Static Generation**: Pre-built pages for optimal performance
- **Asset Optimization**: Automatic image and asset optimization
- **Zero JavaScript**: Minimal client-side JavaScript by default

### **Developer Experience**
- **Fast Refresh**: Instant updates during development
- **TypeScript First**: Built-in TypeScript support
- **File-based Routing**: Intuitive page creation
- **Component Islands**: Mix static and interactive seamlessly

---

## 👥 Team & Contribution

### **Core Team**
- **Aditya Prakash** – [Aditya.Prakash@adypu.edu.in](mailto:Aditya.Prakash@adypu.edu.in)  
- **Abhay Pratap Yadav** – [Abhaypratap.Yadav@adypu.edu.in](mailto:Abhaypratap.Yadav@adypu.edu.in)  
- **Saubhagya Anubhav** – [Saubhagya.Anubhav@adypu.edu.in](mailto:Saubhagya.Anubhav@adypu.edu.in)  
- **Yashveer Singh** – [yashveer.singh@adypu.edu.in](mailto:yashveer.singh@adypu.edu.in)  

### **Contributing**
We welcome contributions! Please read our contributing guidelines and code of conduct.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

## 🚀 Deployment & Production

### **Production Build**
```bash
# Build client for production
cd client && npm run build

# Build server for production
cd server && npm run build
```

### **Deployment Options**
- **Vercel/Netlify**: For frontend deployment
- **Railway/Heroku**: For full-stack deployment
- **AWS/GCP**: For scalable cloud deployment
- **Docker**: Containerized deployment ready

---

## 📈 Roadmap & Future Enhancements

### **Phase 1: Core Features** ✅
- [x] Modern Astro frontend with TypeScript
- [x] Component architecture setup
- [x] Responsive design system
- [x] Backend API foundation

### **Phase 2: Advanced Features** 🚧
- [ ] AI-powered event recommendations
- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app development

### **Phase 3: Enterprise Features** 📋
- [ ] Multi-tenant architecture
- [ ] Advanced security features
- [ ] Third-party integrations
- [ ] White-label solutions

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Support & Community

- **Issues**: [GitHub Issues](https://github.com/Yashsingh045/EventEase/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Yashsingh045/EventEase/discussions)
- **Documentation**: [Wiki](https://github.com/Yashsingh045/EventEase/wiki)

---

<div align="center">

**Built with ❤️ by the EventEase Team**

[Website](https://eventease.com) • [Documentation](https://docs.eventease.com) • [Support](mailto:support@eventease.com)

</div>