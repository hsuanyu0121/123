# AI Chatbot with Gemini API

A minimal personal website chatbot powered by Google's Gemini API.

## 醫學常識：Heat-Related Illness

### 三個層級
（1）熱痙攣  
（2）熱衰竭  
（3）中暑

### Common Symptoms
#### 熱痙攣
- 腿部或腹部肌肉痙攣
- 大量出汗
- 口渴與疲倦

#### 熱衰竭
- 頭暈與虛弱
- 噁心或頭痛
- 皮膚濕冷黏膩

#### 中暑
- 意識混亂或昏迷
- 皮膚灼熱乾燥或停止出汗
- 脈搏快速且體溫升高

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
# hhhh
# hhhh
# hhhh
# hhhh
