# EventEase Client

Modern, responsive frontend built with **Astro**, **TypeScript**, and component-based architecture.

## Project Structure

```
client/
├── src/
│   ├── pages/              # Route pages (file-based routing)
│   │   ├── index.astro     # Landing page
│   │   ├── login.astro     # Login page
│   │   └── register.astro  # Registration page
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.astro    # Navigation bar
│   │   ├── Footer.astro    # Footer section
│   │   ├── Hero.astro      # Hero section
│   │   ├── Features.astro  # Features showcase
│   │   ├── Stats.astro     # Statistics display
│   │   ├── Testimonials.astro  # User testimonials
│   │   ├── FAQ.astro       # FAQ accordion
│   │   ├── Contact.astro   # Contact form
│   │   ├── CTA.astro       # Call-to-action section
│   │   ├── Spinner.astro   # Loading spinner
│   │   └── Alert.astro     # Alert notifications
│   ├── layouts/
│   │   └── Layout.astro    # Base layout with global styles
│   └── assets/             # Static assets
├── public/                 # Public static files
└── package.json

```

## Pages

### 1. **Landing Page** (`/`)
- **Components Used:**
  - `Hero` - Main hero section with gradient background
  - `Features` - Feature cards grid
  - `Testimonials` - User testimonials
  - `FAQ` - Frequently asked questions
  - `Contact` - Contact form
  - `CTA` - Call-to-action section

### 2. **Login Page** (`/login`)
- Email/password authentication
- Social login options (Google, GitHub)
- "Remember me" functionality
- Forgot password link
- Feature highlights sidebar
- Responsive design

### 3. **Register Page** (`/register`)
- Multi-field registration form
- First name, last name, email, phone
- Password with confirmation
- Role selection (Organizer/Attendee/Both)
- Terms and conditions checkbox
- Social registration options
- Form validation

## Components

### Layout Components

#### **Layout.astro**
Base layout with:
- Global CSS variables
- Responsive typography
- Utility classes
- Button styles
- Container widths

#### **Navbar.astro**
Features:
- Sticky navigation
- Logo with gradient text
- Responsive mobile menu
- Active route highlighting
- Login/Register buttons
- Smooth animations

#### **Footer.astro**
Includes:
- Multi-column layout
- Brand section with social links
- Quick links
- Support links
- Contact information
- Copyright notice

### Section Components

#### **Hero.astro**
- Gradient background with animated orbs
- Eye-catching title with gradient text
- Call-to-action buttons
- Statistics display
- Fully responsive

#### **Features.astro**
- 6 feature cards in responsive grid
- Icon, title, and description
- Hover animations
- Mobile-optimized layout

#### **Stats.astro**
- 4 key statistics
- Icon + number + label format
- Gradient numbers
- Responsive grid

#### **Testimonials.astro**
- 3 user testimonials
- User avatar, name, role
- Star ratings
- Hover effects
- Responsive cards

#### **Stats.astro**
- Removed component
- No longer in use

#### **FAQ.astro**
- Accordion-style FAQ
- Expandable/collapsible items
- Smooth animations
- Mobile-friendly

#### **Contact.astro**
- Two-column layout
- Contact information
- Contact form with validation
- Email, phone, location
- Sticky sidebar on desktop

#### **CTA.astro**
- Eye-catching call-to-action
- Gradient background
- Two action buttons
- Responsive design

### Utility Components

#### **Spinner.astro**
Props:
- `size`: 'small' | 'medium' | 'large'
- `color`: 'primary' | 'white'

Usage:
```astro
<Spinner size="medium" color="primary" />
```

#### **Alert.astro**
Props:
- `type`: 'info' | 'success' | 'warning' | 'error'
- `message`: string
- `dismissible`: boolean

Usage:
```astro
<Alert type="success" message="Login successful!" dismissible={true} />
```

## Design System

### Colors
```css
--primary-color: #667eea
--primary-dark: #5568d3
--secondary-color: #764ba2
--accent-color: #f093fb
--text-dark: #2d3748
--text-light: #718096
--bg-light: #f7fafc
--bg-white: #ffffff
--border-color: #e2e8f0
--success-color: #48bb78
--error-color: #f56565
```

### Typography
- Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- Line height: 1.6
- Responsive font sizes

### Shadows
```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)
```

### Button Classes
- `.btn` - Base button style
- `.btn-primary` - Primary gradient button
- `.btn-secondary` - Secondary outline button
- `.btn-full` - Full width button
- `.btn-large` - Larger button size

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:4321](http://localhost:4321)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Responsive Design

All components are fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## Features

### Performance
- ⚡ Static-first with Astro
- 🎨 Minimal JavaScript
- 📦 Optimized bundles
- 🖼️ Lazy loading images

### Accessibility
- ♿ ARIA labels
- ⌨️ Keyboard navigation
- 🎨 Sufficient color contrast
- 📱 Screen reader friendly

### SEO
- 📝 Semantic HTML
- 🔍 Meta tags
- 📊 Schema markup ready
- Open Graph tags

## Customization

### Adding New Pages
Create a new `.astro` file in `src/pages/`:
```astro
---
import Layout from '../layouts/Layout.astro';
import Navbar from '../components/Navbar.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="New Page">
  <Navbar />
  <main>
    <!-- Your content -->
  </main>
  <Footer />
</Layout>
```

### Creating Components
Create a new component in `src/components/`:
```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="my-component">
  <h2>{title}</h2>
</div>

<style>
  .my-component {
    /* Your styles */
  }
</style>
```

## Dependencies

```json
{
  "astro": "^5.14.1"
}
```

## Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Discord](https://astro.build/chat)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Team

Built with ❤️ by the EventEase Team
- Aditya Prakash
- Abhay Pratap Yadav
- Saubhagya Anubhav
- Yashveer Singh

---

**Note:** This is the frontend client. Make sure the backend server is running for full functionality.
