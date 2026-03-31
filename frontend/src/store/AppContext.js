import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { courses } from '@/data/courses';

const AppContext = createContext(null);

const STORAGE_KEY = 'ladc_enrolled';
const USER_KEY = 'ladc_user';

const initialState = {
  mockUser: null,
  enrolledCourseIds: [],
  isAuthModalOpen: false,
  isPaymentModalOpen: false,
  selectedCourse: null,
  pendingCourse: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'MOCK_LOGIN': {
      const user = { name: action.payload.name, email: action.payload.email };
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      const newState = {
        ...state,
        mockUser: user,
        isAuthModalOpen: false,
      };
      if (state.pendingCourse) {
        return {
          ...newState,
          isPaymentModalOpen: true,
          selectedCourse: state.pendingCourse,
          pendingCourse: null,
        };
      }
      return newState;
    }
    case 'MOCK_LOGOUT': {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(STORAGE_KEY);
      return {
        ...initialState,
      };
    }
    case 'OPEN_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: true,
        pendingCourse: action.payload || null,
      };
    case 'CLOSE_AUTH_MODAL':
      return {
        ...state,
        isAuthModalOpen: false,
        pendingCourse: null,
      };
    case 'OPEN_PAYMENT_MODAL':
      return {
        ...state,
        isPaymentModalOpen: true,
        selectedCourse: action.payload,
      };
    case 'CLOSE_PAYMENT_MODAL':
      return {
        ...state,
        isPaymentModalOpen: false,
        selectedCourse: null,
      };
    case 'ENROLL_COURSE': {
      const newIds = [...new Set([...state.enrolledCourseIds, action.payload])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      return {
        ...state,
        enrolledCourseIds: newIds,
      };
    }
    case 'LOAD_ENROLLED':
      return {
        ...state,
        enrolledCourseIds: action.payload.enrolled,
        mockUser: action.payload.user,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const user = localStorage.getItem(USER_KEY);
      dispatch({
        type: 'LOAD_ENROLLED',
        payload: {
          enrolled: stored ? JSON.parse(stored) : [],
          user: user ? JSON.parse(user) : null,
        },
      });
    } catch {
      // ignore parse errors
    }
  }, []);

  const mockLogin = useCallback((name, email) => {
    dispatch({ type: 'MOCK_LOGIN', payload: { name, email } });
  }, []);

  const mockLogout = useCallback(() => {
    dispatch({ type: 'MOCK_LOGOUT' });
  }, []);

  const openAuthModal = useCallback((course) => {
    dispatch({ type: 'OPEN_AUTH_MODAL', payload: course });
  }, []);

  const closeAuthModal = useCallback(() => {
    dispatch({ type: 'CLOSE_AUTH_MODAL' });
  }, []);

  const openPaymentModal = useCallback((course) => {
    dispatch({ type: 'OPEN_PAYMENT_MODAL', payload: course });
  }, []);

  const closePaymentModal = useCallback(() => {
    dispatch({ type: 'CLOSE_PAYMENT_MODAL' });
  }, []);

  const enrollCourse = useCallback((courseId) => {
    dispatch({ type: 'ENROLL_COURSE', payload: courseId });
  }, []);

  const handleEnrol = useCallback(
    (course) => {
      if (!state.mockUser) {
        openAuthModal(course);
      } else {
        openPaymentModal(course);
      }
    },
    [state.mockUser, openAuthModal, openPaymentModal]
  );

  const getCourseById = useCallback((id) => {
    return courses.find((c) => c.id === id) || null;
  }, []);

  const value = {
    ...state,
    mockLogin,
    mockLogout,
    openAuthModal,
    closeAuthModal,
    openPaymentModal,
    closePaymentModal,
    enrollCourse,
    handleEnrol,
    getCourseById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
