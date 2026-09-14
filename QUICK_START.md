# Quick Start: Deploy Gracious School Website to GitHub

## What's Ready ✨

Your Gracious PVT School website is complete with:
- ✅ Beautiful, responsive homepage
- ✅ Student application & enquiry forms
- ✅ Email notifications (forms sent to nazonenyamutora@gmail.com)
- ✅ Confirmation emails sent to applicants
- ✅ Security and rate limiting
- ✅ Full documentation
- ✅ Ready for production

## 5-Minute Setup

### Step 1: Create GitHub Account & Repository
1. Go to [GitHub.com](https://github.com)
2. Sign up or login
3. Click **New repository**
4. Name: `gracious-school-website`
5. Make it **PUBLIC**
6. Click **Create repository**

### Step 2: Push Code to GitHub

Open **PowerShell** in the gracious folder and run:

```powershell
# Navigate to project folder
cd c:\Users\LENOVO x270\Documents\code\gracious

# Initialize git
git config --global user.name "Your Name"
git config --global user.email "your.email@gmail.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Gracious PVT School website"

# Add GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/gracious-school-website.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Enable GitHub Pages (Frontend)

1. Go to your GitHub repository
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under "Build and deployment":
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes for deployment

✅ Your website is now at: `https://YOUR_USERNAME.github.io/gracious-school-website`

### Step 4: Deploy Backend (For Email Forms)

#### Option A: Using Render.com (Easiest & Free)

1. Go to [Render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Click **Connect a repository**
4. Search for `gracious-school-website`
5. Click **Connect**
6. Fill in settings:
   - **Name:** `gracious-school-backend`
   - **Root Directory:** `gracious/backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
7. Click **Advanced** and add Environment Variables:
   - `PORT` = `3000`
   - `FRONTEND_ORIGIN` = `https://YOUR_USERNAME.github.io/gracious-school-website`
   - `EMAIL_USER` = `nazonenyamutora@gmail.com`
   - `EMAIL_PASSWORD` = `[Your Gmail App Password]`
   - `SCHOOL_EMAIL` = `nazonenyamutora@gmail.com`
   - `SCHOOL_PHONE` = `0889447944`
8. Click **Create Web Service**
9. Wait 3-5 minutes for deployment

#### Getting Gmail App Password

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select **Mail** and **Windows Computer**
5. Copy the 16-character password
6. Paste into Render.com's `EMAIL_PASSWORD` field

### Step 5: Connect Frontend to Backend

1. In your GitHub repository, edit `gracious/gracious.html`
2. Find this line (around line 430):
   ```javascript
   const API_BASE_URL = "http://localhost:3000/api";
   ```
3. Replace with your Render backend URL (from the Render.com dashboard):
   ```javascript
   const API_BASE_URL = "https://gracious-school-backend.onrender.com/api";
   ```
4. Scroll down and click **Commit changes**
5. Message: `Update API URL to production backend`
6. Click **Commit**

### Step 6: Test Everything

1. Visit your website: `https://YOUR_USERNAME.github.io/gracious-school-website`
2. Scroll to **Contact** section
3. Fill out a test form (e.g., **Student Application**)
4. Click **Submit**
5. Check email for:
   - School receives the form at nazonenyamutora@gmail.com
   - You receive a confirmation email

## 🎉 You're Done!

Your website is now live and shareable! You can:

✅ **Share the link:** `https://YOUR_USERNAME.github.io/gracious-school-website`
✅ **Receive form submissions** via email at nazonenyamutora@gmail.com
✅ **Send confirmation emails** to applicants
✅ **Update content** anytime by editing files in GitHub

## Tips for Future Updates

Every time you make changes:

```powershell
# Make your changes in the files

# Stage changes
git add .

# Commit
git commit -m "Your description here"

# Push to GitHub
git push
```

Your website updates automatically!

## Common Issues & Fixes

### Forms not sending emails?
- Check if backend is running on Render.com (should be "Live")
- Verify EMAIL_PASSWORD is correct
- Wait 5 minutes after updating environment variables

### Website shows 404 errors?
- Make sure repository is PUBLIC
- GitHub Pages should show "Live" in settings
- Wait 2-3 minutes for deployment

### Can't find Render.com backend URL?
- Go to Render.com dashboard
- Click on your service (gracious-school-backend)
- URL is shown at the top

## Support Resources

- **GitHub Help:** [github.com/support](https://github.com/support)
- **Render.com Docs:** [render.com/docs](https://render.com/docs)
- **Email Issues:** Check Gmail app password is correct
- **Website Questions:** See README.md in repository

## Next Steps (Optional)

- Add more pages/content
- Set up custom domain
- Enable WhatsApp notifications (advanced)
- Add online payment integration
- Create parent portal

---

**Your website is ready to share! 🚀**

Need help? Check DEPLOYMENT_CHECKLIST.md or README.md in your repository.
