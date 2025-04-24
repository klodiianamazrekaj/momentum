"use client"

import { type FC } from "react"
import { ChevronDown, Check } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface DropdownButtonProps {
    value: string
    onValueChange: (value: string) => void
    className?: string
}

const SORT_OPTIONS = [
    { label: "Last Updated", value: "lastUpdated" },
    { label: "Date Created", value: "dateCreated" },
    { label: "Due Date", value: "dueDate" },
    { label: "Title (A-Z)", value: "title" },
    { label: "Progress", value: "progress" },
]

export const DropdownButton: FC<DropdownButtonProps> = ({ 
    value,
    onValueChange,
    className 
}) => {
    const selectedOption = SORT_OPTIONS.find(option => option.value === value)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all border border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                        className
                    )}
                >
                    <span>{selectedOption?.label || "Sort by"}</span>
                    <ChevronDown className="h-4 w-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
                {SORT_OPTIONS.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="flex items-center gap-2"
                        onSelect={() => onValueChange(option.value)}
                    >
                        <div className="w-4">
                            {value === option.value && (
                                <Check className="h-4 w-4" />
                            )}
                        </div>
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 