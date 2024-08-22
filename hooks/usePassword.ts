import { create } from "zustand";

const useStore = create((set) => ({
  passwords: [],
  website: "",
  username: "",
  password: "",
  category: "",

  setWebsite: (website) => set({ website }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setCategory: (category) => set({ category }),

  addPassword: (newPassword) =>
    set((state) => ({
      passwords: [...state.passwords, newPassword],
    })),

  updatePassword: (updatedPassword) =>
    set((state) => ({
      passwords: state.passwords.map((password) =>
        password.id === updatedPassword.id ? updatedPassword : password
      ),
    })),

  setPasswords: (passwords) => set({ passwords }),
}));

export default useStore;
