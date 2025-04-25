"use client"

import { usePathname } from "next/navigation"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PanelRightOpen, X, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS, SETTINGS_ITEMS } from "@/constants/navigation"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type FC } from "react"
import Logo from "../logo/Logo"
import { useSidebarStore } from "@/store/useSidebarStore"
import { NavItemProps, SettingsItemProps, SidebarContentProps } from "@/types/sidebar"
import { DESKTOP_SIDEBAR_WIDTHS, MOBILE_SIDEBAR_WIDTH } from "@/constants/responsiveness"
import { authRoutes } from "@/constants/routes"

// Components
const NavItem: FC<NavItemProps> = ({ item, isActive, isCollapsed }) => (
    <a
        href={item.url}
        className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all relative group",
            isActive
                ? "bg-[#00cc66]/5 text-[#00cc66] font-medium border border-[#00cc66]/20"
                : "text-muted-foreground hover:bg-accent/50",
            isCollapsed ? "justify-center" : ""
        )}
    >
        <item.icon className={cn("h-4 w-4", isActive ? "text-[#00cc66]" : "")} />
        {!isCollapsed && <span>{item.title}</span>}
    </a>
)

const SettingsItem: FC<SettingsItemProps> = ({ item, isActive, isCollapsed }) => {
    const isLogout = item.title === "Log out"
    
    return (
        <a
            href={item.url}
            className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "hover:bg-accent/50 text-muted-foreground",
                isCollapsed ? "justify-center" : "",
                isLogout ? "text-red-500 hover:text-red-600" : ""
            )}
        >
            <item.icon className={cn("h-4 w-4", isLogout ? "text-red-500" : "")} />
            {!isCollapsed && <span>{item.title}</span>}
        </a>
    )
}

const SidebarContent: FC<SidebarContentProps> = ({
    pathname,
    isCollapsed = false,
    onToggleCollapse,
    onClose,
    isMobile
}) => (
    <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                {!isCollapsed && <Logo />}
            </div>
            {isMobile ? (
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            ) : (
                <Button variant="ghost" size="icon" onClick={onToggleCollapse}>
                    <PanelRightOpen className="h-5 w-5" />
                </Button>
            )}
        </div>

        <Separator />

        {/* Profile Section */}
        <div className={cn("px-3 py-2", isCollapsed ? "items-center" : "")}>
            <div
                className={cn(
                    "flex items-center gap-2 p-2 rounded-md hover:bg-accent/50 transition-colors cursor-pointer",
                    isCollapsed ? "justify-center" : ""
                )}
            >
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/user.png" alt="User" />
                    <AvatarFallback>KM</AvatarFallback>
                </Avatar>
                {!isCollapsed && (
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Klodiana Mazrekaj</span>
                            <span className="text-xs text-muted-foreground">Free Plan</span>
                        </div>
                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                )}
            </div>
        </div>

        <Separator className="my-1" />

        {/* Navigation Section */}
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
                {NAVIGATION_ITEMS.map((item) => (
                    <NavItem
                        key={item.title}
                        item={item}
                        isActive={pathname === item.url}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </nav>
        </div>

        {/* Footer Section */}
        <div className="mt-auto py-2">
            <Separator className="my-1" />
            <nav className="grid gap-1 px-2">
                {SETTINGS_ITEMS.map((item) => (
                    <SettingsItem
                        key={item.title}
                        item={item}
                        isActive={pathname === item.url}
                        isCollapsed={isCollapsed}
                    />
                ))}
            </nav>
        </div>
    </div>
)

export const Sidebar: FC = () => {
    const pathname = usePathname()
    const { isOpen, isCollapsed, toggleOpen, toggleCollapsed } = useSidebarStore()

    // Hide sidebar on auth routes
    if (authRoutes.includes(pathname)) {
        return null;
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 md:hidden"
                onClick={() => toggleOpen(true)}
            >
                <PanelRightOpen className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
            </Button>

            {/* Mobile Sidebar */}
            <Sheet open={isOpen} onOpenChange={toggleOpen}>
                <SheetContent side="left" className={cn("p-0", MOBILE_SIDEBAR_WIDTH)}>
                    <SidebarContent
                        pathname={pathname}
                        onClose={() => toggleOpen(false)}
                        isMobile={true}
                    />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div
                className={cn(
                    "hidden md:flex h-screen flex-col border-r bg-background transition-all duration-300",
                    isCollapsed ? DESKTOP_SIDEBAR_WIDTHS.collapsed : DESKTOP_SIDEBAR_WIDTHS.expanded
                )}
            >
                <SidebarContent
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={toggleCollapsed}
                    isMobile={false}
                />
            </div>
        </>
    )
}