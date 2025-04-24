import { Sidebar } from "@/types/sidebar";
import { create } from "zustand";

export const useSidebarStore = create<Sidebar>((set) => ({
    isOpen: false,
    isCollapsed: false,
    toggleOpen: (open) => set((state) => ({isOpen: open !== undefined ? open : !state.isOpen})),
    toggleCollapsed: () => set((state) => ({isCollapsed: !state.isCollapsed})),
}))