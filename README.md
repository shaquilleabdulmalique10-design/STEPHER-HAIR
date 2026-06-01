# STEPHER HAIR - Premium Unisex Salon Web App

A modern, responsive website and Node.js backend for Stepher Hair Unisex Salon.

## 🌟 Features

- **Fully Responsive Design** - Works on desktop, tablet, and mobile devices
- **Multi-Page Web App** - Homepage, portfolio, booking, and contact pages
- **Express Backend** - Secure server handles booking and contact form submissions
- **JSON Persistence** - Stores bookings and messages in `/data` as local JSON files
- **Preloader Timer** - Fixed 5-second preloader for a polished entry experience
- **Google Maps Location** - Contact page includes a map linked to the salon location
- **Security Hardening** - Uses Helmet and rate limiting for safer API usage
- **WhatsApp Integration** - Floating WhatsApp button for instant client contact
- **Animated UI Elements** - Smooth scroll and reveal animations using AOS
- **Modern UI/UX** - Clean, professional layout with strong brand styling

## 📁 Project Structure

```
STEPHER HAIR/
├── index.html          # Main homepage with all sections
├── booking.html        # Appointment booking page
├── contact.html        # Contact page with map and form
├── portfolio.html      # Portfolio gallery with filtering
├── css/                # Styling and responsive layout
│   └── style.css
├── js/                 # Frontend interactions and form handling
│   └── script.js
├── data/               # Persistent booking and message storage
│   ├── bookings.json
│   └── messages.json
├── server.js           # Express backend server
├── package.json        # Node dependencies and start script
├── package-lock.json   # Exact dependency versions
├── Procfile            # Heroku deployment entrypoint
├── Dockerfile          # Docker container support
└── README.md           # Project documentation
```

## 🎨 Sections

### Homepage (index.html)

1. **Hero Section** - Eye-catching banner with call-to-action buttons
2. **Stats Section** - Animated counters showing business achievements
3. **Services Section** - Featured services with pricing
4. **Portfolio Preview** - Latest work showcase
5. **About Section** - Company information and features
6. **Testimonials** - Client reviews and ratings
7. **Booking Section** - Appointment booking form with contact details
8. **Contact Section** - Contact form and Google Maps integration
9. **Footer** - Quick links, contact info, and social media

### Portfolio Page (portfolio.html)

- Filterable gallery (All, Fades, Beard, Design, Color, Before/After)
- Lightbox image viewer
- Professional portfolio cards with tags
- Call-to-action section

## 🎯 Navigation

Clean and streamlined navigation with only essential links:

- Home
- Services (scroll to section)
- Portfolio (separate page)
- About (scroll to section)
- Contact (scroll to section)
- Book Now (highlighted button)

## 💰 Services & Pricing

- **Skin Fade** - ₦5,000
- **Haircut & Beard** - ₦8,000
- **VIP Grooming** - ₦15,000
- **Hair Coloring** - ₦12,000

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🎨 Color Scheme

- **Primary Background**: #0d0d0d (Dark Black)
- **Secondary Background**: #1a1a1a (Lighter Black)
- **Accent Color**: #d4af37 (Gold)
- **Text Color**: #ffffff (White)
- **Secondary Text**: #999999 (Gray)

## 🔧 Technologies Used

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript (ES6+)
- Node.js
- Express
- Helmet
- express-rate-limit
- AOS Library (Animate On Scroll)
- Font Awesome Icons
- Google Fonts (Montserrat, Oswald)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server locally:
   ```bash
   npm start
   ```
3. Open the app in your browser at `http://localhost:3000`

## 🧩 Local Backend

- The Express backend serves the static site and API endpoints.
- Booking form data is posted to `/api/bookings`.
- Contact form data is posted to `/api/messages`.
- Submissions are stored in the `/data` directory.
- Security features include Helmet headers and request rate limiting.

## 🚢 Deployment

This app is ready to deploy online.

- For Heroku, use the included `Procfile`:
  ```bash
  web: npm start
  ```
- For Docker, build and run with:
  ```bash
  docker build -t stepher-hair .
  docker run -p 3000:3000 stepher-hair
  ```
- It also works on platforms like Railway, Render, or any Node.js hosting provider.

> Note: For production, replace local JSON storage with a database if you need durable data across deployments.

## 📞 Contact Information

- **Business**: STEPHER HAIR UNISEX SALON
- **Address**: Local Government, 20 Molipa Express Way, Ijebu Ode 120101, Ogun State
- **Phone**: 09068537778
- **Email**: info@stepherhair.com
- **Map**: The contact page includes the salon location embedded as a clickable map.

## ✨ Key Features

### Mobile Menu

- Hamburger menu for mobile devices
- Smooth slide-in animation
- Auto-close on link click or outside click

### Smooth Scrolling

- Smooth navigation between sections
- Scroll indicator on hero section

### Form Handling

- Booking form with validation
- Contact form with validation
- Success messages on submission

### Portfolio Filtering

- Filter by category (Fades, Beard, Design, Color, Before/After)
- Smooth fade animations
- Lightbox image viewer

### Animations

- Fade-in effects on scroll
- Counter animations for stats
- Hover effects on cards and buttons
- Bounce animation for scroll indicator

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Customization

To customize the website:

1. **Colors**: Edit CSS variables in `style.css`
2. **Content**: Update text in `index.html` and `portfolio.html`
3. **Images**: Replace image URLs with your own
4. **Contact Info**: Update phone numbers, email, and address
5. **Services/Pricing**: Modify service cards and prices

## 🔗 External Resources

- [AOS Library](https://michalsnik.github.io/aos/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)
- [Unsplash Images](https://unsplash.com/)

## 📄 License

© 2024 Stepher Hair. All rights reserved.

---

**Built with ❤️ for premium grooming experiences**
