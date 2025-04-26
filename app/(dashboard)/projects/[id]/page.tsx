"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/header/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ProjectDetails = () => {
  const params = useParams()
  const projectId = params.id as string

  // This would typically come from an API or database
  const project = {
    id: projectId,
    title: "Website Redesign",
    description: "Redesigning my personal portfolio website with updated projects and a new color scheme.",
    status: "active" as const,
    progress: 65,
    tags: ["design", "web"],
    lastUpdated: "Apr 22"
  }

  return (
    <>
      <Header
        title={project.title}
        description="Project details and information"
      />
      <div className="px-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Status</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-green-50 text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Progress</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-600 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Last Updated</h3>
                <p className="text-gray-600">{project.lastUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default ProjectDetails