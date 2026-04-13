# AI Chatbot with Gemini API

A minimal personal website chatbot powered by Google's Gemini API.

## Tech Stack
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js + Express
- **AI**: Google Gemini API
- **Deployment**: GitHub Pages (frontend) + Render (backend)

## Quick Start (Local)

### Backend
```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your Gemini API key
npm run dev
```

### Frontend
Open `http://localhost:3000` in your browser.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions to deploy:
1. Backend to Render (keeps API key private)
2. Frontend to GitHub Pages (public static site)

## Security
- ✓ API key never exposed to frontend
- ✓ API key not committed to GitHub (see `.gitignore`)
- ✓ CORS enabled for safe cross-origin requests
- ✓ Backend handles all sensitive API calls

## Files
- `frontend/` - Public web interface
- `backend/` - Node.js express server
- `.env.example` - Template for environment variables
- `DEPLOYMENT.md` - Deployment guide
# hhhh
# hhhh
