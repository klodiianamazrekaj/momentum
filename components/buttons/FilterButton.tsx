"use client"

import { type FC, type ButtonHTMLAttributes } from "react"
import { Filter } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
}

export const FilterButton: FC<FilterButtonProps> = ({ 
    className,
    ...props 
}) => {
    return (
        <button
            className={cn(
                "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                className
            )}
            {...props}
        >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
        </button>
    )
}
