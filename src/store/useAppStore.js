import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TOUR_PACKAGES } from '../data/mockData';
import axios from 'axios';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Auth State
      token: null,
      user: null, // { id, name, email, role }
      isAuthenticated: false,
      activeRole: null, // 'traveler' | 'agency' | 'admin' - derived from user.role

      language: 'en',

      // Saved Items & Bookings (mock for now, ideally fetched from DB)
      savedPackageIds: ['pkg-loktak-sangai'],
      bookings: [],
      packages: TOUR_PACKAGES,

      agencies: [
        { id: 'ag-1', name: 'Sangai Eco Trails', verified: true, license: 'MN-TOUR-2024-089', email: 'explore@sangaiecotrails.mn', phone: '+91 98621 44321', rating: 4.9, packagesCount: 3 },
      ],

      searchFilters: {
        destination: '',
        theme: 'All',
        priceMax: 30000,
        minEcoScore: 0,
        verifiedOnly: false,
        duration: 'All',
        difficulty: 'All',
        sort: 'popular'
      },

      savedItineraries: [],
      isOffline: false,

      // Actions
      loginSuccess: (token, user) => {
        axios.defaults.headers.common['x-auth-token'] = token;
        set({ token, user, isAuthenticated: true, activeRole: user.role });
      },
      
      logout: () => {
        delete axios.defaults.headers.common['x-auth-token'];
        set({ token: null, user: null, isAuthenticated: false, activeRole: null });
      },

      setLanguage: (lang) => set({ language: lang }),

      toggleSavedPackage: (id) => set((state) => {
        const exists = state.savedPackageIds.includes(id);
        return {
          savedPackageIds: exists
            ? state.savedPackageIds.filter(item => item !== id)
            : [...state.savedPackageIds, id]
        };
      }),

      addBooking: (booking) => set((state) => ({
        bookings: [booking, ...state.bookings]
      })),

      addPackage: (newPackage) => set((state) => ({
        packages: [newPackage, ...state.packages]
      })),

      setSearchFilters: (newFilters) => set((state) => ({
        searchFilters: { ...state.searchFilters, ...newFilters }
      })),

      resetSearchFilters: () => set({
        searchFilters: {
          destination: '', theme: 'All', priceMax: 30000, minEcoScore: 0,
          verifiedOnly: false, duration: 'All', difficulty: 'All', sort: 'popular'
        }
      }),

      toggleOfflineMode: () => set((state) => ({ isOffline: !state.isOffline })),

      saveAIItinerary: (itinerary) => set((state) => ({
        savedItineraries: [itinerary, ...state.savedItineraries]
      }))
    }),
    {
      name: 'manipur-trails-store',
    }
  )
);
