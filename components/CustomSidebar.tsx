"use client";

import { useEffect, useState } from "react";
import {
    LayoutDashboard,
    Package,
    Users,
    BookOpen,
    Edit,
    LineChart,
    Clock,
    FileText,
    BarChart3,
    TrendingUp,
    PieChart,
    Activity,
    UserPlus,
    Search,
    Layers,
    Megaphone,
    Settings,
    Key,
    DollarSign,
    ChevronDown,
    ChevronRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    Package,
    Users,
    BookOpen,
    Edit,
    LineChart,
    Clock,
    FileText,
    BarChart3,
    TrendingUp,
    PieChart,
    Activity,
    UserPlus,
    Search,
    Layers,
    Megaphone,
    Settings,
    Key,
    DollarSign,
};

const sectionLabels: Record<string, string> = {
    overview: "Visão Geral",
    workouts: "Treinos",
    analytics: "Análises",
    user_management: "Gestão de Alunos",
    instructor_management: "Gestão de Instrutores",
    marketing: "Marketing",
    configuration: "Configuração",
};

export default function Sidebar({ navigation, initialBranch }: any) {
    const [expandedSection, setExpandedSection] = useState<string | null>("overview");
    const [branchId, setBranchId] = useState<string | null>(initialBranch?.id || null); // state for storing branchId

    useEffect(() => {
        if (initialBranch?.id) {
            setBranchId(initialBranch.id); // set the branchId when initialBranch is available
        }
    }, [initialBranch]); // dependency on initialBranch to update branchId when it's loaded

    const toggleSection = (section: string) => {
        setExpandedSection((prev) => (prev === section ? null : section));
    };

    return (
        <div className="hidden w-70 flex-shrink-0 flex-col md:flex">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5">
                {Object.keys(navigation).map((key) => (
                    <div key={key} className="px-3 py-2">
                        <div
                            onClick={() => toggleSection(key)}
                            className="mb-2 flex cursor-pointer items-center px-4 text-lg font-semibold tracking-tight"
                        >
                            <span className="flex-1">
                                {sectionLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            {expandedSection === key ? (
                                <ChevronDown className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            )}
                        </div>
                        {expandedSection === key && (
                            <div className="space-y-1">
                                {navigation[key].map((item: any) => {
                                    const Icon = iconMap[item.icon];
                                    return (
                                        <a
                                            key={item.name}
                                            href={`${item.href}`}
                                            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
                                        >
                                            {Icon && <Icon className="mr-2 h-4 w-4" />}
                                            {item.name}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}