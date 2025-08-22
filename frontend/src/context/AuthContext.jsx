/**
 * Authentication Context for Global State Management
 * Manages user authentication state across the application
 */
import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI, TokenManager } from '../api/axiosClient';

// Create Auth Context
const AuthContext = createContext();

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  
  LOGOUT: 'LOGOUT',
  
  LOAD_USER: 'LOAD_USER',
  UPDATE_USER: 'UPDATE_USER',
  
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  SET_LOADING: 'SET_LOADING',
};

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    
    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    
    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    
    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    
    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    
    case AUTH_ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    default:
      return state;
  }
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Load user from localStorage on app start
  useEffect(() => {
    const loadUser = () => {
      const user = TokenManager.getUser();
      const accessToken = TokenManager.getAccessToken();
      
      if (user && accessToken) {
        dispatch({ type: AUTH_ACTIONS.LOAD_USER, payload: user });
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };
    
    loadUser();
  }, []);
  
  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.LOGIN_START });
      
      const response = await authAPI.login(credentials);
      const { user, tokens } = response.data;
      
      // Store tokens and user data
      TokenManager.setTokens(tokens.access, tokens.refresh);
      TokenManager.setUser(user);
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_SUCCESS, 
        payload: { user } 
      });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.detail ||
                          error.message || 
                          'Login failed';
      
      dispatch({ 
        type: AUTH_ACTIONS.LOGIN_FAILURE, 
        payload: errorMessage 
      });
      
      return { success: false, error: errorMessage };
    }
  };
  
  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.REGISTER_START });
      
      const response = await authAPI.register(userData);
      const { user, tokens } = response.data;
      
      // Store tokens and user data
      TokenManager.setTokens(tokens.access, tokens.refresh);
      TokenManager.setUser(user);
      
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_SUCCESS, 
        payload: { user } 
      });
      
      return { success: true, data: response.data };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.email?.[0] ||
                          error.response?.data?.username?.[0] ||
                          error.message || 
                          'Registration failed';
      
      dispatch({ 
        type: AUTH_ACTIONS.REGISTER_FAILURE, 
        payload: errorMessage 
      });
      
      return { success: false, error: errorMessage, errors: error.response?.data };
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      const refreshToken = TokenManager.getRefreshToken();
      
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local data
      TokenManager.clearTokens();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };
  
  // Update profile function
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      const updatedUser = response.data;
      
      // Update stored user data
      TokenManager.setUser(updatedUser);
      
      dispatch({ 
        type: AUTH_ACTIONS.UPDATE_USER, 
        payload: updatedUser 
      });
      
      return { success: true, data: updatedUser };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Profile update failed';
      
      return { success: false, error: errorMessage, errors: error.response?.data };
    }
  };
  
  // Change password function
  const changePassword = async (passwordData) => {
    try {
      await authAPI.changePassword(passwordData);
      return { success: true, message: 'Password changed successfully' };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.old_password?.[0] ||
                          error.response?.data?.new_password?.[0] ||
                          error.message || 
                          'Password change failed';
      
      return { success: false, error: errorMessage, errors: error.response?.data };
    }
  };
  
  // Clear errors function
  const clearErrors = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERRORS });
  };
  
  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearErrors,
    
    // Utility functions
    isLoggedIn: state.isAuthenticated,
    isAdmin: state.user?.role === 'admin',
    isModerator: state.user?.role === 'moderator',
    isVerified: state.user?.is_verified,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};