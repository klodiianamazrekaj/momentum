"use client"

import { Search } from "lucide-react"
import { type FC } from "react"

interface SearchProps {
    placeholder?: string
}

export const SearchComponent: FC<SearchProps> = ({ 
    placeholder = "Search projects..." 
}) => {
    return (
        <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
            </div>
            <input
                type="text"
                placeholder={placeholder}
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-gray-400 focus:border-[#00cc66] focus:ring-1 focus:ring-[#00cc66]"
            />
        </div>
    )
}
