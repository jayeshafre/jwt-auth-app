#!/bin/bash

# JWT Auth API - Manual Testing Script
# Make sure your Django server is running on http://127.0.0.1:8000

BASE_URL="http://127.0.0.1:8000/api"
EMAIL="testuser@example.com"
PASSWORD="SecurePassword123!"

echo "🚀 Starting JWT Auth API Tests..."
echo "=================================="

# Test 1: Health Check
echo "📋 Test 1: Health Check"
curl -s -X GET "${BASE_URL}/auth/health/" | jq '.'
echo ""

# Test 2: API Root
echo "📋 Test 2: API Root"
curl -s -X GET "${BASE_URL}/" | jq '.'
echo ""

# Test 3: User Registration
echo "📋 Test 3: User Registration"
REGISTER_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/register/" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"${EMAIL}\",
    \"username\": \"testuser\",
    \"first_name\": \"Test\",
    \"last_name\": \"User\",
    \"phone\": \"+1234567890\",
    \"password\": \"${PASSWORD}\",
    \"password_confirm\": \"${PASSWORD}\"
  }")

echo $REGISTER_RESPONSE | jq '.'

# Extract tokens from registration response
ACCESS_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.tokens.access // empty')
REFRESH_TOKEN=$(echo $REGISTER_RESPONSE | jq -r '.tokens.refresh // empty')

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Registration failed or user already exists. Trying login instead..."
  
  # Test 4: User Login (if registration failed)
  echo "📋 Test 4: User Login"
  LOGIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/login/" \
    -H "Content-Type: application/json" \
    -d "{
      \"email\": \"${EMAIL}\",
      \"password\": \"${PASSWORD}\"
    }")
  
  echo $LOGIN_RESPONSE | jq '.'
  
  # Extract tokens from login response
  ACCESS_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.tokens.access // empty')
  REFRESH_TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.tokens.refresh // empty')
fi

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Could not get access token. Check your credentials and try again."
  exit 1
fi

echo "✅ Access Token obtained successfully!"
echo ""

# Test 5: Get Profile (Protected Route)
echo "📋 Test 5: Get User Profile"
curl -s -X GET "${BASE_URL}/auth/profile/" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" | jq '.'
echo ""

# Test 6: Update Profile
echo "📋 Test 6: Update User Profile"
curl -s -X PATCH "${BASE_URL}/auth/profile/" \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{
    \"bio\": \"Updated bio from API test script\",
    \"phone\": \"+1987654321\"
  }" | jq '.'
echo ""

# Test 7: Token Refresh
echo "📋 Test 7: Token Refresh"
REFRESH_RESPONSE=$(curl -s -X POST "${BASE_URL}/auth/refresh/" \
  -H "Content-Type: application/json" \
  -d "{\"refresh\": \"${REFRESH_TOKEN}\"}")

echo $REFRESH_RESPONSE | jq '.'

# Update access token
NEW_ACCESS_TOKEN=$(echo $REFRESH_RESPONSE | jq -r '.access // empty')
if [ ! -z "$NEW_ACCESS_TOKEN" ]; then
  ACCESS_TOKEN=$NEW_ACCESS_TOKEN
  echo "✅ Token refreshed successfully!"
fi
echo ""

# Test 8: Forgot Password
echo "📋 Test 8: Forgot Password Request"
curl -s -X POST "${BASE_URL}/auth/forgot-password/" \
  -H "Content-Type: application/json" \
  -d "{\"email\": \"${EMAIL}\"}" | jq '.'
echo ""

# Test 9: Error Scenario - Invalid Login
echo "📋 Test 9: Invalid Login (Error Test)"
curl -s -X POST "${BASE_URL}/auth/login/" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"${EMAIL}\",
    \"password\": \"WrongPassword\"
  }" | jq '.'
echo ""

# Test 10: Error Scenario - Unauthorized Access
echo "📋 Test 10: Unauthorized Access (Error Test)"
curl -s -X GET "${BASE