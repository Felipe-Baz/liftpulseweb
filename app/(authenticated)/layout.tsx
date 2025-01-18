'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { BadgePercent, BarChart4, Columns3, Globe, Locate, Settings2, ShoppingBag, ShoppingCart, Users } from "lucide-react";
import SidebarLayout, { SidebarItem } from '@/components/sidebar-layout';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';
import GymSelector from '@/components/GymSelector';

const navigationItems: SidebarItem[] = [
    {
        name: "Overview",
        href: "/",
        icon: Globe,
        type: "item",
    },
    {
        type: 'label',
        name: 'Management',
    },
    {
        name: "Products",
        href: "/products",
        icon: ShoppingBag,
        type: "item",
    },
    {
        name: "People",
        href: "/people",
        icon: Users,
        type: "item",
    },
    {
        name: "Segments",
        href: "/segments",
        icon: Columns3,
        type: "item",
    },
    {
        name: "Regions",
        href: "/regions",
        icon: Locate,
        type: "item",
    },
    {
        type: 'label',
        name: 'Monetization',
    },
    {
        name: "Revenue",
        href: "/revenue",
        icon: BarChart4,
        type: "item",
    },
    {
        name: "Orders",
        href: "/orders",
        icon: ShoppingCart,
        type: "item",
    },
    {
        name: "Discounts",
        href: "/discounts",
        icon: BadgePercent,
        type: "item",
    },
    {
        type: 'label',
        name: 'Settings',
    },
    {
        name: "Configuration",
        href: "/configuration",
        icon: Settings2,
        type: "item",
    },
];

export default function AuthenticatedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                router.push('/login');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <SidebarLayout
            items={navigationItems}
            basePath={`/dashboard`}
            sidebarTop={<GymSelector />}
        >
            <div className="min-h-screen bg-background">
                <nav className="border-b">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-14">
                            <div className="flex">
                                <div className="flex-shrink-0 flex items-center">
                                    <h1 className="text-xl font-bold">Dashboard</h1>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex gap-4 mr-5 items-center">
                                    <ColorModeSwitcher />
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </SidebarLayout>
    );
}