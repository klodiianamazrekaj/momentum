import React from 'react';
import { useRouter } from 'next/navigation';

interface ProjectCardProps {
    id: string;
    title: string;
    description: string;
    status: 'active' | 'planning' | 'completed' | 'paused';
    progress: number;
    tags: string[];
    lastUpdated: string;
}

const statusConfig = {
    active: {
        label: 'Active',
        bgColor: 'bg-green-50',
        textColor: 'text-green-600',
        dotColor: 'bg-green-600',
        borderColor: 'border-t-green-600'
    },
    planning: {
        label: 'Planning',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-600',
        dotColor: 'bg-blue-600',
        borderColor: 'border-t-blue-600'
    },
    paused: {
        label: 'Paused',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-600',
        dotColor: 'bg-amber-600',
        borderColor: 'border-t-amber-600'
    },
    completed: {
        label: 'Completed',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        dotColor: 'bg-gray-600',
        borderColor: 'border-t-gray-600'
    }
};

const ProjectCard: React.FC<ProjectCardProps> = ({
    id,
    title,
    description,
    status,
    progress,
    tags,
    lastUpdated,
}) => {
    const router = useRouter();
    const config = statusConfig[status];

    const handleClick = () => {
        router.push(`/projects/${id}`);
    };

    return (
        <div 
            onClick={handleClick}
            className={`bg-white rounded-2xl p-6 shadow-md max-w-[600px] border-t-4 ${config.borderColor} h-[280px] flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200`}
        >
            <div>
                <h2 className="text-2xl font-semibold mb-2">{title}</h2>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.textColor} ${config.bgColor} mb-4`}>
                    <span className={`w-2 h-2 rounded-full ${config.dotColor}`}></span>
                    {config.label}
                </div>

                <p className="text-gray-600 text-base leading-relaxed h-[60px] line-clamp-3">
                    {description}
                </p>
            </div>

            <div className="mt-auto">
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Progress</span>
                        <span className="font-medium">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${config.dotColor} rounded-full transition-all duration-300`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">
                        Updated {lastUpdated}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
