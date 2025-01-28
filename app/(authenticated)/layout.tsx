'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { ColorModeSwitcher } from '@/components/color-mode-switcher';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useBranch } from '@/contexts/branch-context';

export default function AuthenticatedLayout({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const { setSelectedBranch } = useBranch();  // Desestruturando para resetar o branch selecionado

    const handleLogout = async () => {
        try {
            // Faz o logout do Firebase
            await signOut(auth);

            // Limpa o contexto de branches e remove dados do localStorage
            localStorage.clear();  // Apaga dados do localStorage

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
