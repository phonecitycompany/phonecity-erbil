import { create } from 'zustand'

export const useUserTypeStore = create((set) => ({
  typeOfUser: 'Viewer',
  changeToAdmin: () => set({ typeOfUser: "Admin" }),
}))