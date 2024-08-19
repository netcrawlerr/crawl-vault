import { create } from "zustand";

const useUser = create((set) => ({
  userId: null,
  isLoggedIn: false,
  isRegistered: false, // Default to false
  user: null, // Add user details
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
  setIsRegistered: (status) => set({ isRegistered: status }), // Correctly set isRegistered
  setUser: (user) => set({ user }), // Set user details
}));

export default useUser;
