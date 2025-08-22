/**
 * Axios Client Configuration for JWT Authentication
 * Handles API requests, token refresh, and error handling
 */
import axios from 'axios';

// Create axios instance
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Token management utilities
const TokenManager = {
  getAccessToken: () => localStorage.getItem('access_token'),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  },
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  },
};

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
  (config) => {
    const token = TokenManager.getAccessToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If token expired and we haven't already tried to refresh
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      TokenManager.getRefreshToken()
    ) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = TokenManager.getRefreshToken();
        
        // Attempt to refresh token
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'}/auth/refresh/`,
          { refresh: refreshToken }
        );
        
        const { access, refresh } = response.data;
        TokenManager.setTokens(access, refresh || refreshToken);
        
        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axiosClient(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError);
        
        // Refresh failed, redirect to login
        TokenManager.clearTokens();
        
        // Redirect to login page
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Log error in development
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, {
        message: error.response?.data?.message || error.message,
        errors: error.response?.data?.errors || error.response?.data,
      });
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/auth/register/',
  LOGIN: '/auth/login/',
  LOGOUT: '/auth/logout/',
  REFRESH: '/auth/refresh/',
  
  // Profile
  PROFILE: '/auth/profile/',
  CHANGE_PASSWORD: '/auth/change-password/',
  
  // Password Reset
  FORGOT_PASSWORD: '/auth/forgot-password/',
  RESET_PASSWORD: '/auth/reset-password/',
  
  // Health
  HEALTH: '/auth/health/',
};

// Auth API methods
export const authAPI = {
  // Register new user
  register: (userData) => 
    axiosClient.post(API_ENDPOINTS.REGISTER, userData),
  
  // Login user
  login: (credentials) => 
    axiosClient.post(API_ENDPOINTS.LOGIN, credentials),
  
  // Logout user
  logout: (refreshToken) => 
    axiosClient.post(API_ENDPOINTS.LOGOUT, { refresh_token: refreshToken }),
  
  // Get user profile
  getProfile: () => 
    axiosClient.get(API_ENDPOINTS.PROFILE),
  
  // Update user profile
  updateProfile: (profileData) => 
    axiosClient.patch(API_ENDPOINTS.PROFILE, profileData),
  
  // Change password
  changePassword: (passwordData) => 
    axiosClient.post(API_ENDPOINTS.CHANGE_PASSWORD, passwordData),
  
  // Forgot password
  forgotPassword: (email) => 
    axiosClient.post(API_ENDPOINTS.FORGOT_PASSWORD, { email }),
  
  // Reset password
  resetPassword: (resetData) => 
    axiosClient.post(API_ENDPOINTS.RESET_PASSWORD, resetData),
  
  // Health check
  healthCheck: () => 
    axiosClient.get(API_ENDPOINTS.HEALTH),
};

// Export token manager for use in components
export { TokenManager };

export default axiosClient;