import { NAVIGATION_ITEMS, SETTINGS_ITEMS } from "@/constants/navigation";
import {LucideIcon} from "lucide-react";

export type SidebarItem = {
    title: string;
    icon: LucideIcon;
    url: string
}

export type Sidebar = {
    isOpen: boolean;
    isCollapsed: boolean;
    toggleOpen: (open?: boolean) => void;
    toggleCollapsed: (collapsed?: boolean) => void;
}

export type SidebarContentProps = {
    pathname: string
    isCollapsed?: boolean
    onToggleCollapse?: () => void
    onClose?: () => void
    isMobile: boolean
}

export type NavItemProps = {
    item: typeof NAVIGATION_ITEMS[number]
    isActive: boolean
    isCollapsed: boolean
}

export type SettingsItemProps = {
    item: typeof SETTINGS_ITEMS[number]
    isActive: boolean
    isCollapsed: boolean
}