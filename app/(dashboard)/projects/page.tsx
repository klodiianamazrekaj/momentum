"use client"

import React, { useState } from 'react'
import { Header } from '@/components/header/Header'
import { SearchComponent } from '@/components/search/Search'
import { FilterButton } from '@/components/buttons/FilterButton'
import { DropdownButton } from '@/components/buttons/DropdownButton'
import { Tabs } from '@/components/tabs/Tabs'

const Projects = () => {
    const [sortBy, setSortBy] = useState("dateCreated")
    const [activeTab, setActiveTab] = useState("all")

    const tabs = [
        { id: "all", label: "All", count: 7 },
        { id: "active", label: "Active", count: 2 },
        { id: "planning", label: "Planning", count: 2 },
        { id: "completed", label: "Completed", count: 2 }
    ]

    return (
        <>
            <Header
                title="Projects"
                description="Create and manage your projects"
            />
            <div className="px-6 mt-6 flex items-center gap-4">
                <SearchComponent placeholder="Search projects..." />
                <div className="flex items-center gap-2 shrink-0">
                    <FilterButton />
                    <DropdownButton
                        value={sortBy}
                        onValueChange={setSortBy}
                    />
                </div>
            </div>
            <div className="px-6 mt-6">
                <Tabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
        </>
    )
}

export default Projects