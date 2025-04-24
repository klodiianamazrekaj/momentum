"use client"

import { type FC } from "react"
import { GradientButton } from "../buttons/GradientButton"
import { Plus } from "lucide-react"

interface HeaderProps {
    title: string
    description?: string
}

export const Header: FC<HeaderProps> = ({ title, description }) => {
    return (
        <header className="px-6 pt-[75px] flex justify-between items-start">
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-black">{title}</h1>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            <GradientButton icon={Plus}>
                New Project
            </GradientButton>
        </header>
    )
}
