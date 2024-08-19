import { create } from "zustand";

const useStore = create((set) => ({
  passwords: [],
  website: "",
  username: "",
  password: "",
  category: "",

  // Setters for single values
  setWebsite: (website) => set({ website }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setCategory: (category) => set({ category }),

  // Add a new password
  addPassword: (newPassword) =>
    set((state) => ({
      passwords: [...state.passwords, newPassword],
    })),

  // Update an existing password
  updatePassword: (updatedPassword) =>
    set((state) => ({
      passwords: state.passwords.map((password) =>
        password.id === updatedPassword.id ? updatedPassword : password
      ),
    })),

  // Set the passwords array
  setPasswords: (passwords) => set({ passwords }),
}));

export default useStore;
