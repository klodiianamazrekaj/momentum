"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import CreateProjectButton from '../buttons/CreateProjectButton';

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (projectData: {
        title: string;
        description: string;
        status: 'active' | 'planning' | 'completed' | 'paused';
    }) => void;
}

const statusConfig = {
    active: {
        label: 'Active - Currently working on this project',
        bgColor: 'bg-green-50',
        hoverBg: 'hover:bg-green-50',
        textColor: 'text-green-600',
        borderColor: 'border-green-600'
    },
    planning: {
        label: 'Planning - In the planning phase',
        bgColor: 'bg-blue-50',
        hoverBg: 'hover:bg-blue-50',
        textColor: 'text-blue-600',
        borderColor: 'border-blue-600'
    },
    paused: {
        label: 'Paused - Temporarily on hold',
        bgColor: 'bg-amber-50',
        hoverBg: 'hover:bg-amber-50',
        textColor: 'text-amber-600',
        borderColor: 'border-amber-600'
    },
    completed: {
        label: 'Completed - Project is finished',
        bgColor: 'bg-gray-100',
        hoverBg: 'hover:bg-gray-100',
        textColor: 'text-gray-600',
        borderColor: 'border-gray-600'
    }
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [status, setStatus] = React.useState<'active' | 'planning' | 'completed' | 'paused'>('active');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, description, status });
        setTitle('');
        setDescription('');
        setStatus('active');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-[600px] relative">
                <button
                    onClick={onClose}
                    className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-semibold mb-2">Create New Project</h2>
                <p className="text-gray-600 mb-6">
                    Add a new project to your workspace. Fill in the details below to get started.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label className="block mb-2">
                            <span className="font-medium">
                                Project Title <span className="text-red-500">*</span>
                            </span>
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter project title"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2">
                            <span className="font-medium">Description</span>
                            <span className="text-gray-500 ml-1">(optional)</span>
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your project"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent h-32 resize-none"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="block mb-2">
                            <span className="font-medium">Initial State</span>
                        </label>
                        <div className="relative">
                            <Select value={status} onValueChange={(value) => setStatus(value as any)}>
                                <SelectTrigger className={cn(
                                    "w-full",
                                    status && statusConfig[status].bgColor,
                                    status && statusConfig[status].textColor
                                )}>
                                    <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(statusConfig).map(([value, config]) => (
                                        <SelectItem
                                            key={value}
                                            value={value}
                                            className={cn(
                                                "transition-colors",
                                                config.hoverBg,
                                                "data-[state=checked]:" + config.bgColor,
                                                "data-[state=checked]:" + config.textColor
                                            )}
                                        >
                                            {config.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <CreateProjectButton variant="default" type="submit">
                            Create Project
                        </CreateProjectButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal; 