'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthenticatedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Faz o logout do Firebase
            await signOut(auth);

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
                    <button onClick={handleLogout} className="text-sm">Logout</button>
                </div>
            </header>
            <main className="max-w mx-auto overflow-y-none">
                {children}
            </main>
        </div>
    );
}
