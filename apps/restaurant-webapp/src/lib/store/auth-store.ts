import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { useRouter } from 'next/navigation'
import { API_ENDPOINTS } from '../endpoints'

// Types
interface Vendor {
  id: string;
  businessEmail: string;
  businessName?: string;
  type?: string;
  status?: string;
}

interface AuthState {
  vendor: Vendor | null;
  accessToken: string | null;
  isLoading: boolean;
  lastChecked: number;
  initializeAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  authFetch: (url: string, options?: RequestInit) => Promise<Response>;
  setVendor: (vendor: Vendor | null) => void;
  setAccessToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      vendor: null,
      accessToken: null,
      isLoading: false,
      lastChecked: 0,
      setVendor: (vendor) => set({ vendor }),
      setAccessToken: (token) => set({ accessToken: token }),
      setLoading: (loading) => set({ isLoading: loading }),

      initializeAuth: async () => {
        const now = Date.now();
        set({ isLoading: true });

        try {
          const response = await fetch(API_ENDPOINTS.AUTH.FETCH_USER, {
            credentials: 'include'
          });

          if (response.ok) {
            const { user } = await response.json();
            const newToken = response.headers.get('x-access-token');

            set({
              vendor: user,
              accessToken: newToken ?? null,
              lastChecked: now
            });
          } else {
            await get().logout();
          }
        } catch (error) {
          console.error("Auth init error:", error);
          await get().logout();
        } finally {
          set({ isLoading: false });
        }
      },
 
      login: async (email, password) => {
        try {
          const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });

          if (response.ok) {
            const { accessToken, vendor } = await response.json();
            set({ accessToken, vendor });
            return { success: true };
          } else {
            const errorData = await response.json();
            return { success: false, error: errorData.error || 'Login failed' };
          }
        } catch (error) {
          console.error('Login error:', error);
          return { success: false, error: 'Network error during login' };
        }
      },

      logout: async () => {
        try {
          await fetch(API_ENDPOINTS.AUTH.LOGOUT, {
            method: 'POST',
            credentials: 'include'
          });

          set({ vendor: null, accessToken: null });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      // auth-store.ts
      authFetch: async (url: string, options: RequestInit = {}) => {
        const { accessToken, logout, setAccessToken } = get();   // ⬅ add setAccessToken

        const response = await fetch(url, {
          ...options,
          headers: {
            ...(options.headers ?? {}),
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
          credentials: 'include',                                // ⬅ ships refresh‑token cookie
        })

        // 🔄 Grab a fresh access‑token if the middleware rotated it
        const newToken = response.headers.get('x-access-token');
        if (newToken) setAccessToken(newToken);

        if (response.status === 401) {
          await logout();                                         // token really invalid
          throw new Error('Session expired. Please login again.');
        }

        return response;
      },

    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ 
        vendor: state.vendor,
        isLoading: state.isLoading,
        lastChecked: state.lastChecked 
      })
    }
  )
);

// Utility hook for easier consumption
export const useAuth = () => {
  const {
    vendor,
    accessToken,
    isLoading,
    initializeAuth,
    login,
    logout,
    authFetch,
    setVendor,
    setAccessToken,
    setLoading,
  } = useAuthStore();

  return {
    vendor,
    accessToken,
    isLoading,
    initializeAuth,
    login,
    logout,
    authFetch,
    setVendor,
    setAccessToken,
    setLoading,
    isAuthenticated: !!vendor
  };
};




