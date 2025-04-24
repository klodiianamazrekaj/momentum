"use client"

import { FC } from 'react'

interface Tab {
    id: string
    label: string
    count?: number
}

interface TabsProps {
    tabs: Tab[]
    activeTab: string
    onTabChange: (tabId: string) => void
}

export const Tabs: FC<TabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    return (
        <div className="flex gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-out
                        ${activeTab === tab.id 
                            ? 'text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }
                    `}
                >
                    {activeTab === tab.id && (
                        <div 
                            className="absolute inset-0 bg-gradient-to-r from-[#00cc66] to-[#00cc66]/80 rounded-lg"
                            style={{
                                backgroundImage: 'linear-gradient(135deg, #00cc66 0%, #00cc66 100%)',
                            }}
                        />
                    )}
                    <span className="relative z-10">
                        {tab.label}
                        {tab.count !== undefined && (
                            <span className={`ml-2 ${activeTab === tab.id ? 'text-white/90' : 'text-gray-400'}`}>
                                ({tab.count})
                            </span>
                        )}
                    </span>
                </button>
            ))}
        </div>
    )
} 