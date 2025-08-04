#!/bin/bash

# eGuard API - Vercel Deployment Script

echo "🚀 Starting eGuard API deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build the project
echo "🔨 Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "📚 API Documentation: https://your-app.vercel.app/api/docs"
echo "🔍 Health Check: https://your-app.vercel.app/api" 