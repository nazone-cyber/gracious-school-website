# Gracious PVT School Website

A modern, responsive website for Gracious PVT School - a nurturing primary and nursery school in Blantyre, Malawi.

## Features

✨ **Beautiful & Responsive Design**
- Modern, clean interface optimized for all devices
- Smooth scrolling and animations
- Professional color scheme and typography

📋 **Multiple Forms**
- Student Application Form
- General Enquiry Form
- Contact Office Form
- Newsletter Subscription

📧 **Email Integration**
- Automatic email notifications to school office
- Confirmation emails sent to applicants
- Form responses delivered via email

🎓 **Program Pages**
- Baby Class
- Reception
- Grades 1-3
- Grades 4-6

🖼️ **Photo Galleries**
- Slideshow galleries with automatic rotation
- Nursery class highlights
- School events and celebrations

## Project Structure

```
gracious/
├── gracious.html              # Main homepage
├── index.html                 # Landing page (same as gracious.html)
├── baby-class.html           # Baby class details
├── reception.html            # Reception class details
├── grades-1-3.html           # Grades 1-3 details
├── grades-4-6.html           # Grades 4-6 details
├── school-life.html          # School events and photos
├── logo.jpeg                 # School logo
├── gracious pictures/        # School photos
├── backend/
│   ├── server.js            # Express backend server
│   ├── package.json         # Node dependencies
│   ├── .env.example         # Environment variables template
│   └── .env                 # Local environment variables (create from .env.example)
└── README.md                # This file
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Git
- Gmail account (for email functionality)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gracious-school-website.git
cd gracious-school-website
```

### 2. Frontend Setup

Simply open `gracious.html` or `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python -m http.server 5500

# Or using Node (npm install -g http-server)
http-server -p 5500
```

The website will be available at `http://localhost:5500`

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd gracious/backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file from template:

```bash
cp .env.example .env
```

Configure environment variables in `.env`:

```env
PORT=3000
FRONTEND_ORIGIN=http://localhost:5500
EMAIL_USER=nazonenyamutora@gmail.com
EMAIL_PASSWORD=your_app_password_here
SCHOOL_EMAIL=nazonenyamutora@gmail.com
SCHOOL_PHONE=0889447944
```

### 4. Gmail App Password Setup

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the generated 16-character password
6. Paste it in `.env` as `EMAIL_PASSWORD`

### 5. Start the Backend Server

```bash
npm start
```

You should see: `Gracious backend listening on http://localhost:3000`

### 6. Test the Application

1. Open `http://localhost:5500` in your browser
2. Navigate to the contact or form sections
3. Submit a test form
4. Verify that:
   - The form submission succeeds
   - You receive an email at the configured school email
   - The applicant receives a confirmation email

## Form Types

### Student Application
Required fields:
- Student's full name
- Date of birth
- Class applying for
- Parent/guardian name
- Email
- Phone
- Consent checkbox

### General Enquiry
Required fields:
- Name
- Email
- Enquiry topic
- Message

### Contact Office
Required fields:
- Name
- Email
- Message
- Phone (optional)

### Newsletter
Required fields:
- Email address

## Deployment to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `gracious-school-website`
3. Do NOT initialize with README (we have one)
4. Click Create Repository

### Step 2: Initialize Git & Push Code

```bash
cd path/to/gracious-school-website

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Gracious PVT School website"

# Add remote origin
git remote add origin https://github.com/yourusername/gracious-school-website.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Deploy Frontend (GitHub Pages)

1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
4. Click Save

Your website will be available at: `https://yourusername.github.io/gracious-school-website`

### Step 4: Deploy Backend (Heroku, Render, or Railway)

#### Using Render.com (Recommended - Free)

1. Go to [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** gracious-school-backend
   - **Branch:** main
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables:
   - `PORT`: 3000
   - `FRONTEND_ORIGIN`: `https://yourusername.github.io/gracious-school-website`
   - `EMAIL_USER`: nazonenyamutora@gmail.com
   - `EMAIL_PASSWORD`: [your Gmail app password]
   - `SCHOOL_EMAIL`: nazonenyamutora@gmail.com
   - `SCHOOL_PHONE`: 0889447944

### Step 5: Update Frontend API URL

After deploying backend, update `gracious.html` to use the production API:

Find this line in the JavaScript section:
```javascript
const API_BASE_URL = "http://localhost:3000/api";
```

Replace with your deployed backend URL:
```javascript
const API_BASE_URL = "https://your-backend-url.onrender.com/api";
```

Push the change:
```bash
git add gracious.html
git commit -m "Update API URL to production backend"
git push
```

## Contact Details

- **Email:** nazonenyamutora@gmail.com
- **Phone:** 0889447944
- **Location:** Blantyre Fargo, next to Infuse Guest House, Blantyre, Malawi

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features to Add (Future)

- [ ] WhatsApp integration for form responses
- [ ] Parent portal with grades and attendance
- [ ] Online payment system for fees
- [ ] Staff directory
- [ ] Event calendar
- [ ] Mobile app
- [ ] Multi-language support

## Security Notes

- ✅ CORS protection enabled
- ✅ Helmet.js security headers
- ✅ Rate limiting on API endpoints
- ✅ Input validation and sanitization
- ✅ Email validation

**Important:** Never commit `.env` file with real credentials to GitHub. Use `.gitignore`:

```
node_modules/
.env
.DS_Store
*.log
```

## Troubleshooting

### Forms not sending emails
1. Check if `.env` file exists in `backend/` folder
2. Verify Gmail app password is correct
3. Check backend server is running: `npm start`
4. Check CORS settings if getting API errors

### Frontend not connecting to backend
1. Ensure backend is running on port 3000
2. Check `API_BASE_URL` in `gracious.html`
3. Update FRONTEND_ORIGIN in `.env` to match frontend URL

### 404 errors on GitHub Pages
Make sure your repository is public and GitHub Pages is enabled in settings.

## License

Private - Gracious PVT School

## Support

For technical issues or questions, contact the development team.

---

**Last Updated:** September 2026
**Status:** Production Ready ✅
