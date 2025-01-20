'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';

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
        <div className="min-h-screen bg-background">
            <header className="p-4 flex justify-between items-center border-b">
                <div>
                    {/* Aqui pode estar o logo ou título do seu app */}
                    <h1 className="text-xl font-bold">LiftPulse</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <ColorModeSwitcher />
                </div>
            </header>
            <main className="max-w mx-auto">
                {children}
            </main>
        </div>
    );
}
