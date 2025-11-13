#!/bin/bash

# Azure Static Web App Local Build & Deploy Script
# This script builds the Vite project locally and deploys to Azure Static Web Apps

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}Azure Static Web App Deployment${NC}"
echo -e "${BLUE}=====================================${NC}"

# Configuration
RESOURCE_GROUP="websitedeployment"
APP_NAME="coinleylandingpage"
BUILD_DIR="out"

# Step 1: Clean previous build
echo -e "\n${GREEN}[1/4] Cleaning previous build...${NC}"
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
    echo "✓ Cleaned $BUILD_DIR directory"
fi

# Step 2: Install dependencies
echo -e "\n${GREEN}[2/4] Installing dependencies...${NC}"
npm install
echo "✓ Dependencies installed"

# Step 3: Build the project
echo -e "\n${GREEN}[3/4] Building project...${NC}"
npm run build
echo "✓ Build completed successfully"

# Verify build output
if [ ! -d "$BUILD_DIR" ]; then
    echo -e "${RED}Error: Build directory '$BUILD_DIR' not found!${NC}"
    exit 1
fi

# Step 4: Deploy to Azure
echo -e "\n${GREEN}[4/4] Deploying to Azure Static Web App...${NC}"
echo "Resource Group: $RESOURCE_GROUP"
echo "App Name: $APP_NAME"

# Deploy using Azure CLI
az staticwebapp upload \
    --name "$APP_NAME" \
    --resource-group "$RESOURCE_GROUP" \
    --source "$BUILD_DIR" \
    --no-wait

echo -e "\n${GREEN}=====================================${NC}"
echo -e "${GREEN}✓ Deployment initiated successfully!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "\nYour app will be available at:"
echo -e "${BLUE}https://witty-cliff-0d267f303.6.azurestaticapps.net${NC}"
echo -e "\nTo check deployment status:"
echo -e "${BLUE}az staticwebapp show --name $APP_NAME --resource-group $RESOURCE_GROUP${NC}"
