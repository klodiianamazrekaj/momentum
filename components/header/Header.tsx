"use client"

import { type FC } from "react"

interface HeaderProps {
    title: string
    description?: string
    children?: React.ReactNode
}

export const Header: FC<HeaderProps> = ({ title, description, children }) => {
    return (
        <header className="px-6 pt-[75px] flex justify-between items-start">
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-black">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            {children}
        </header>
    )
}
