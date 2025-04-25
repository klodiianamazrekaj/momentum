"use client"

import React, { useState } from 'react'
import { Header } from '@/components/header/Header'
import { SearchComponent } from '@/components/search/Search'
import { FilterButton } from '@/components/buttons/FilterButton'
import { DropdownButton } from '@/components/buttons/DropdownButton'
import { Tabs } from '@/components/tabs/Tabs'
import ProjectCard from '@/components/project/ProjectCard'
import CreateProjectModal from '@/components/modals/CreateProjectModal'
import { GradientButton } from '@/components/buttons/GradientButton'
import { Plus } from 'lucide-react'

const Projects = () => {
    const [sortBy, setSortBy] = useState("dateCreated")
    const [activeTab, setActiveTab] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const tabs = [
        { id: "all", label: "All", count: 7 },
        { id: "active", label: "Active", count: 2 },
        { id: "planning", label: "Planning", count: 2 },
        { id: "paused", label: "Paused", count: 2 },
        { id: "completed", label: "Completed", count: 2 }
    ]

    const projects = [
        {
            title: "Website Redesign",
            description: "Redesigning my personal portfolio website with updated projects and a new color scheme.",
            status: "active" as const,
            progress: 65,
            tags: ["design", "web"],
            lastUpdated: "Apr 22"
        },
        {
            title: "Mobile App Development",
            description: "Building a new fitness tracking application for iOS and Android platforms.",
            status: "planning" as const,
            progress: 35,
            tags: ["mobile", "react-native"],
            lastUpdated: "Apr 20"
        },
        {
            title: "E-commerce Platform",
            description: "Creating an online marketplace for local artisans to sell their handmade products.",
            status: "completed" as const,
            progress: 90,
            tags: ["web", "commerce"],
            lastUpdated: "Apr 15"
        },
        {
            title: "AI Chat Integration",
            description: "Implementing an AI-powered chat system for customer support automation.",
            status: "paused" as const,
            progress: 45,
            tags: ["ai", "backend"],
            lastUpdated: "Apr 18"
        }
    ]

    const handleCreateProject = (projectData: {
        title: string;
        description: string;
        status: 'active' | 'planning' | 'completed' | 'paused';
    }) => {
        // Handle project creation here
        console.log('New project:', projectData);
    };

    return (
        <>
            <Header
                title="Projects"
                description="Create and manage your projects"
            >
                <GradientButton 
                    icon={Plus}
                    onClick={() => setIsModalOpen(true)}
                >
                    New Project
                </GradientButton>
            </Header>
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
            <div className="px-6 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        {...project}
                    />
                ))}
            </div>

            <CreateProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </>
    )
}

export default Projects