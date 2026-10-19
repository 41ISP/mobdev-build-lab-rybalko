import { create } from "zustand";
import { api } from "../api/api";

export const useItemStore = create((set) => ({
    item: null,
    stats: null,
    items: [],
    getItems: async () => {
        try {
            const res = await api.getItems()
            set({items: res.data})
        } catch(error) {
            console.error(error)
        }
    },
    getStats: async () => {
        try {
            const res = await api.getStats()
            set({stats: res.data})
        } catch(error) {
            console.error(error)
        }
    },
    getItem: async (id) => {
        try {
            const res = await api.getItem(id);
            set({ item: res.data });
        } catch (error) {
            console.error(error); } },
}))