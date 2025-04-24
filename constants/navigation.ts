import { SidebarItem } from "@/types/sidebar";
import { LayoutDashboard, Settings, LogOut, Lightbulb, Folders, ChartBarIncreasing } from "lucide-react";

export const NAVIGATION_ITEMS: SidebarItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        url: "/dashboard"
    },
    {
        title: "Idea Incubator",
        icon: Lightbulb,
        url: "/ideas"
    },
    {
        title: "All Projects",
        icon: Folders,
        url: "/projects",
    },
    {
        title: "Analytics",
        icon: ChartBarIncreasing,
        url: "/analytics",
    },
];

export const SETTINGS_ITEMS: SidebarItem[] = [
    {
        title: "Log out",
        icon: LogOut,
        url: "/logout",
    },
    {
        title: "Settings", 
        icon: Settings,
        url: "/settings"
    }
];