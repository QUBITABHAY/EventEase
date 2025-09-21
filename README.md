# 🎯 EventEase

> **The Ultimate Event Management Platform for Modern Organizations**

EventEase is a cutting-edge, full-stack event management platform built with modern web technologies. Designed to streamline event creation, management, and attendee engagement, EventEase transforms how organizations handle events from conception to completion.

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-Latest-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## ✨ Key Features

### 🎯 **Smart Event Management**
- **Intuitive Dashboard**: Modern, responsive interface built with React and shadcn/ui
- **Real-time Updates**: Live event statistics and attendee management
- **Advanced Analytics**: Comprehensive insights and reporting tools

### 🚀 **Modern Technology Stack**
- **Lightning Fast**: Powered by Vite for instant hot module replacement
- **Type-Safe**: Built with modern JavaScript and component libraries
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Database Agnostic**: Prisma ORM for seamless database operations

### 🔐 **Enterprise-Grade Security**
- **JWT Authentication**: Secure user authentication and authorization
- **Data Protection**: Industry-standard security practices
- **Role-Based Access**: Granular permission system for different user types

### 📱 **User Experience First**
- **Animated Navigation**: Smooth pill-style navigation with GSAP animations
- **Component Library**: Consistent UI using shadcn/ui components
- **Accessibility**: WCAG compliant design patterns
- **Progressive Web App**: Mobile app-like experience

---

## 🏗️ Architecture & Tech Stack

### **Frontend**
```
├── React 18.2.0          # Component-based UI framework
├── Vite 7.1.6            # Next-generation build tool
├── Tailwind CSS 3.4.17   # Utility-first CSS framework
├── shadcn/ui             # High-quality component library
├── GSAP                  # Animation library
└── React Router DOM      # Client-side routing
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
# Terminal 1: Client (React + Vite)
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
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route components
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

EventEase uses a modern component library approach:

- **shadcn/ui**: Pre-built, customizable components
- **Tailwind CSS**: Utility-first styling
- **Custom Components**: PillNav with GSAP animations
- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching support

---

## 🔧 Development Workflow

### **Available Scripts**

**Client (React + Vite)**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
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
- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Eliminate unused code
- **Asset Optimization**: Automatic image and asset optimization
- **Caching Strategies**: Optimized caching for better performance

### **Developer Experience**
- **Hot Module Replacement**: Instant updates during development
- **TypeScript Ready**: Easy TypeScript integration
- **Component Documentation**: Storybook integration ready
- **Testing Framework**: Jest and React Testing Library setup

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
- [x] Modern React frontend with Vite
- [x] Component library integration
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