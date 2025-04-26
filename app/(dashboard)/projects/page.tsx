"use client"

import React, { useState, useMemo, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { SearchComponent } from '@/components/search/Search'
import { FilterButton } from '@/components/buttons/FilterButton'
import { DropdownButton } from '@/components/buttons/DropdownButton'
import { Tabs } from '@/components/tabs/Tabs'
import ProjectCard from '@/components/project/ProjectCard'
import CreateProjectModal from '@/components/modals/CreateProjectModal'
import { GradientButton } from '@/components/buttons/GradientButton'
import { Plus } from 'lucide-react'

interface Project {
    id: string
    title: string
    description: string
    status: 'active' | 'planning' | 'completed' | 'paused'
    progress: number
    tags: string[]
    lastUpdated: string
}

const Projects = () => {
    const [sortBy, setSortBy] = useState("dateCreated")
    const [activeTab, setActiveTab] = useState("all")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        // Fetch projects data here
        const fetchProjects = async () => {
            try {
                // Replace this with your actual API call
                const response = await fetch('/api/projects')
                const data = await response.json()
                setProjects(data)
            } catch (error) {
                console.error('Error fetching projects:', error)
                // Fallback to static data if API fails
                setProjects([
                    {
                        id: "website-redesign",
                        title: "Website Redesign",
                        description: "Redesigning my personal portfolio website with updated projects and a new color scheme.",
                        status: "active" as const,
                        progress: 65,
                        tags: ["design", "web"],
                        lastUpdated: "Apr 22"
                    },
                    {
                        id: "mobile-app-development",
                        title: "Mobile App Development",
                        description: "Building a new fitness tracking application for iOS and Android platforms.",
                        status: "planning" as const,
                        progress: 35,
                        tags: ["mobile", "react-native"],
                        lastUpdated: "Apr 20"
                    },
                    {
                        id: "website-development-framer",
                        title: "Website Development with Framer",
                        description: "Building a new website for a local business using Framer.",
                        status: "active" as const,
                        progress: 35,
                        tags: ["web", "framer"],
                        lastUpdated: "Apr 20"
                    },
                    {
                        id: "ecommerce-platform",
                        title: "E-commerce Platform",
                        description: "Creating an online marketplace for local artisans to sell their handmade products.",
                        status: "completed" as const,
                        progress: 90,
                        tags: ["web", "commerce"],
                        lastUpdated: "Apr 15"
                    },
                    {
                        id: "ai-chat-integration",
                        title: "AI Chat Integration",
                        description: "Implementing an AI-powered chat system for customer support automation.",
                        status: "paused" as const,
                        progress: 45,
                        tags: ["ai", "backend"],
                        lastUpdated: "Apr 18"
                    }
                ])
            }
        }

        fetchProjects()
    }, [])

    // Calculate project counts for each status
    const projectCounts = useMemo(() => {
        const counts = {
            all: projects.length,
            active: 0,
            planning: 0,
            paused: 0,
            completed: 0
        }

        projects.forEach(project => {
            counts[project.status]++
        })

        return counts
    }, [projects])

    const tabs = [
        { id: "all", label: "All", count: projectCounts.all },
        { id: "active", label: "Active", count: projectCounts.active },
        { id: "planning", label: "Planning", count: projectCounts.planning },
        { id: "paused", label: "Paused", count: projectCounts.paused },
        { id: "completed", label: "Completed", count: projectCounts.completed }
    ]

    // Filter projects based on active tab
    const filteredProjects = useMemo(() => {
        if (activeTab === "all") {
            return projects
        }
        return projects.filter(project => project.status === activeTab)
    }, [activeTab, projects])

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
                {filteredProjects.map((project, index) => (
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
