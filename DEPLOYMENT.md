# Deployment Guide

This project has two parts that deploy separately:
- **Frontend**: Static HTML/CSS/JS → GitHub Pages (public)
- **Backend**: Node.js + Gemini API → Render or Vercel (private, hidden API key)

---

## 1. Deploy Backend to Render (Free Tier)

### Step 1: Prepare Backend
```bash
cd backend
npm install
```

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository

### Step 3: Configure Render
- **Name**: `chatbot-api` (or your choice)
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  - `GEMINI_API_KEY`: Paste your API key
  - `GEMINI_MODEL`: `gemini-2.5-flash`
  - `PORT`: `3000`

### Step 4: Deploy
- Click "Create Web Service"
- Render builds and deploys automatically
- Your backend URL will be: `https://chatbot-api.onrender.com`

---

## 2. Update Frontend with Backend URL

Edit `frontend/script.js` and replace:
```javascript
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000"
  : "https://your-backend-url.com";  // ← Replace with your Render URL
```

Example:
```javascript
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000"
  : "https://chatbot-api.onrender.com";
```

---

## 3. Deploy Frontend to GitHub Pages

### Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chatbot.git
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main`
4. **Folder**: `/frontend`
5. Click **Save**

### Step 3: GitHub Pages URL
After 1-2 minutes, your site will be live at:
- `https://YOUR_USERNAME.github.io/chatbot/`

---

## 4. Enable CORS on Backend

If you get CORS errors, add this to `backend/server.js` (already included):
```javascript
app.use(cors());
```

---

## 5. Test Live Deployment
1. Open `https://YOUR_USERNAME.github.io/chatbot/`
2. Type a message
3. Should see AI response from your Render backend
4. Check Network tab in DevTools—API calls go to `https://chatbot-api.onrender.com/api/chat`

---

## Security Checklist ✓
- [ ] API key is in `backend/.env` (never committed to GitHub)
- [ ] `.gitignore` includes `.env`
- [ ] Backend URL is public in frontend code (safe, no secrets there)
- [ ] Render has environment variables set (not in code)
- [ ] GitHub Pages only shows frontend code

---

## Troubleshooting

**"Cannot find module openai"**
- Render builder didn't run `npm install`
- Check Render build logs

**CORS error in browser console**
- Backend URL is wrong in `script.js`
- Verify Render URL and update `API_URL`

**API key exposed in GitHub**
- Add `.env` to `.gitignore`
- If already committed: `git rm --cached backend/.env` + `git commit`

**Render goes to sleep (free tier)**
- First request after idle takes 30-60 seconds
- Upgrade to Paid tier if needed
