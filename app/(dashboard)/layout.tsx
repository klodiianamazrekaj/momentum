import React from 'react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex-1 flex flex-col min-h-screen">
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
} 