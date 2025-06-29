# Deployment Guide

This guide will help you deploy your Financial Dashboard to production.

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Frontend Deployment (Vercel)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up/Login with GitHub**
3. **Import your repository:**
   - Click "New Project"
   - Select your `Financial-Dashboard` repository
   - Set Root Directory to `frontend`
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Deploy!**

#### Backend Deployment (Railway)

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login with GitHub**
3. **Deploy from GitHub:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `Financial-Dashboard` repository
   - Set Root Directory to `backend`
4. **Add Environment Variables:**
   - `PORT`: 5000
   - `JWT_SECRET`: Your secret key
   - `MONGODB_URI`: Your MongoDB connection string
5. **Deploy!**

#### Update Frontend API URL

After backend deployment, update the API base URL in your frontend:

```typescript
// frontend/src/services/api.ts
const API_BASE_URL = 'https://your-railway-app-url.railway.app';
```

### Option 2: Netlify (Frontend) + Heroku (Backend)

#### Frontend (Netlify)

1. **Go to [netlify.com](https://netlify.com)**
2. **Connect your GitHub repo**
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Deploy!**

#### Backend (Heroku)

1. **Install Heroku CLI**
2. **Login to Heroku:**
   ```bash
   heroku login
   ```
3. **Create Heroku app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```
4. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set MONGODB_URI=your_mongodb_uri
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 3: Render.com (Full Stack)

1. **Go to [render.com](https://render.com)**
2. **Create two services:**

#### Backend Service
- **Type:** Web Service
- **Root Directory:** `backend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Environment Variables:** Add your JWT_SECRET and MONGODB_URI

#### Frontend Service
- **Type:** Static Site
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`

## Environment Variables

### Backend (.env)
```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
MONGODB_URI=mongodb://localhost:27017/financial-dashboard
NODE_ENV=production
```

### Frontend
Update the API base URL in `frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas account**
2. **Create a new cluster**
3. **Get connection string**
4. **Add to environment variables**

### Local MongoDB (Development)
```bash
# Install MongoDB locally
# Update MONGODB_URI to: mongodb://localhost:27017/financial-dashboard
```

## Post-Deployment Checklist

- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Check CORS settings
- [ ] Test transaction CRUD operations
- [ ] Verify analytics endpoints
- [ ] Test export functionality
- [ ] Check responsive design
- [ ] Verify dark/light theme toggle

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Update CORS configuration in backend
   - Add your frontend URL to allowed origins

2. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

3. **Database Connection:**
   - Verify MongoDB URI is correct
   - Check network access for MongoDB Atlas

4. **Environment Variables:**
   - Ensure all required variables are set
   - Check variable names match code

### Support

If you encounter issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test locally first
4. Check platform-specific documentation

## Cost Estimation

### Free Tiers Available:
- **Vercel:** Free tier with generous limits
- **Railway:** Free tier available
- **Netlify:** Free tier available
- **Render:** Free tier available
- **MongoDB Atlas:** Free tier available

### Paid Options (if needed):
- **Vercel Pro:** $20/month
- **Railway:** Pay-as-you-use
- **Heroku:** $7/month (basic dyno)
- **MongoDB Atlas:** $9/month (M0 cluster)

## Security Considerations

1. **Use HTTPS in production**
2. **Set strong JWT secrets**
3. **Enable MongoDB authentication**
4. **Use environment variables for secrets**
5. **Regular security updates**
6. **Input validation on all endpoints** 