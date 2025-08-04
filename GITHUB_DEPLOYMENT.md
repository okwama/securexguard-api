# eGuard API - GitHub to Vercel Deployment Guide

## 🚀 Overview

This guide covers deploying the eGuard API to Vercel using GitHub for version control and automated deployments.

## 📋 Prerequisites

1. **GitHub Account** - For repository hosting
2. **Vercel Account** - For hosting the API
3. **Vercel CLI** - For local development and deployment
4. **Database** - MySQL database accessible from Vercel

## 🔧 Setup Steps

### 1. Initialize Git Repository

```bash
cd server/eguard-api
git init
git add .
git commit -m "Initial commit"
```

### 2. Create GitHub Repository

1. Go to GitHub and create a new repository
2. Push your code to GitHub:

```bash
git remote add origin https://github.com/yourusername/eguard-api.git
git branch -M main
git push -u origin main
```

### 3. Connect to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project to Vercel
vercel link
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project settings

### 4. Configure Environment Variables

In your Vercel dashboard, add these environment variables:

#### Database Configuration
```
DB_HOST=102.130.125.52
DB_PORT=3306
DB_USERNAME=impulsep_root
DB_PASSWORD=@bo9511221.qwerty
DB_DATABASE=impulsep_securex
```

#### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=5h
```

#### Server Configuration
```
PORT=5000
NODE_ENV=production
```

#### CORS Configuration
```
CORS_ORIGIN=https://eguard-guards.vercel.app,https://eguard-securex.vercel.app
```

### 5. Setup GitHub Secrets

For automated deployment, add these secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:

```
VERCEL_TOKEN=your-vercel-token
ORG_ID=your-vercel-org-id
PROJECT_ID=your-vercel-project-id
```

#### How to get these values:

**VERCEL_TOKEN:**
1. Go to Vercel dashboard
2. Navigate to Settings > Tokens
3. Create a new token

**ORG_ID and PROJECT_ID:**
1. Run `vercel link` in your project
2. Check the `.vercel/project.json` file
3. Or run `vercel project ls` to see project details

## 🔄 Automated Deployment

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file is already configured to:

1. Trigger on pushes to main/master branch
2. Run tests before deployment
3. Build the project
4. Deploy to Vercel automatically

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## 📱 Flutter App Configuration

After deployment, update your Flutter apps:

### Guards App
```dart
// guards/lib/utils/auth_config.dart
class ApiConfig {
  static const String baseUrl = 'https://eguard-api.vercel.app';
}
```

### Securex App
```dart
// securex/lib/utils/auth_config.dart
class ApiConfig {
  static const String baseUrl = 'https://eguard-api.vercel.app';
}
```

## 🧪 Testing Deployment

### 1. Health Check
```bash
curl https://eguard-api.vercel.app/api
```

### 2. API Documentation
Visit: `https://eguard-api.vercel.app/api/docs`

### 3. Test Authentication
```bash
curl -X POST https://eguard-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"0706166875","password":"password123"}'
```

## 🔍 Monitoring

### Vercel Dashboard
- Monitor function execution times
- Check for errors in function logs
- Review API usage statistics

### GitHub Actions
- Monitor deployment status
- Check test results
- Review build logs

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check GitHub Actions logs
   - Verify all dependencies are installed
   - Ensure TypeScript compilation passes

2. **Environment Variables**
   - Verify all variables are set in Vercel dashboard
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Database Connection**
   - Ensure database allows external connections
   - Verify database credentials
   - Check if database server is accessible from Vercel

4. **CORS Errors**
   - Update CORS origins in API configuration
   - Add your Flutter app domains to allowed origins

### Debugging Steps

1. **Check Vercel Function Logs**
   ```bash
   vercel logs
   ```

2. **Test Locally**
   ```bash
   npm run start:dev
   ```

3. **Verify Environment Variables**
   ```bash
   vercel env ls
   ```

## 🔄 Update Process

### Making Changes

1. Make your changes locally
2. Test with `npm run start:dev`
3. Commit and push to GitHub
4. GitHub Actions will automatically deploy to Vercel

### Rollback

1. Go to Vercel dashboard
2. Navigate to Deployments
3. Select a previous deployment
4. Click "Promote to Production"

## 📊 Performance Optimization

### Vercel Configuration
- Function timeout: 30 seconds
- Memory allocation: 1024MB
- Region: US East (iad1)

### Database Optimization
- Use connection pooling
- Implement query caching
- Optimize database indexes

### API Optimization
- Implement request caching
- Use compression
- Add proper error handling

## 🔒 Security

### Environment Variables
- Never commit sensitive data to Git
- Use Vercel's environment variable system
- Rotate secrets regularly

### CORS Configuration
- Only allow necessary origins
- Use HTTPS in production
- Implement proper authentication

### Database Security
- Use strong passwords
- Limit database access
- Enable SSL connections

## 📞 Support

For issues with:
- **GitHub Actions**: Check Actions tab in repository
- **Vercel Deployment**: Check Vercel dashboard logs
- **Database Issues**: Verify MySQL server configuration
- **API Errors**: Check function logs in Vercel dashboard

## 🎯 Production Checklist

- [ ] GitHub repository created and connected
- [ ] Vercel project configured
- [ ] Environment variables set
- [ ] Database accessible from Vercel
- [ ] CORS origins updated
- [ ] Flutter apps updated with new API URL
- [ ] API documentation accessible
- [ ] Authentication working
- [ ] All endpoints tested
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security headers enabled
- [ ] GitHub Actions workflow working
- [ ] Automated deployment successful 