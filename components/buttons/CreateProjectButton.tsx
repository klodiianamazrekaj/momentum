"use client"

import { type FC, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Plus } from "lucide-react"

interface CreateProjectButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
    className?: string
    children: React.ReactNode
}

const CreateProjectButton: FC<CreateProjectButtonProps> = ({
    variant = "default",
    size = "default",
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                // Base styles
                "rounded-md font-medium transition-all duration-200 disabled:opacity-50 cursor-pointer inline-flex items-center gap-2",
                // Gradient background
                variant === "default" && "bg-[#00cc66] text-white hover:opacity-90",
                // Outline variant
                variant === "outline" && "border-2 bg-[#00cc66] text-[#00cc66] hover:bg-[#00cc66]/10",
                // Sizes
                size === "default" && "px-4 py-2",
                size === "sm" && "px-3 py-1.5 text-sm",
                size === "lg" && "px-6 py-3 text-lg",
                className
            )}
            {...props}
        >
            <Plus className="h-4 w-4" />
            {children}
        </button>
    )
}

export default CreateProjectButton
