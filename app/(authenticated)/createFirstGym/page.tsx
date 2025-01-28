"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBranch } from "@/actions/fetch-branches"

export default function RegisterGym() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const name = formData.get("name") as string
            const address = formData.get("address") as string

            if (!name?.trim()) {
                throw new Error("Nome é obrigatório")
            }

            await addBranch(name, address || null)

            toast.success("Academia cadastrada com sucesso.", {
                position: 'top-right',
                autoClose: 5000,
            })

            // Opcional: redirecionar para outra página
            router.push('/dashboard')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro ao cadastrar academia", {
                position: 'top-right',
                autoClose: 5000,
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container flex items-center justify-center min-h-screen py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Cadastrar Academia</CardTitle>
                    <CardDescription>Preencha os dados abaixo para cadastrar sua academia na plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome da Academia *</Label>
                            <Input id="name" name="name" placeholder="Digite o nome da academia" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Localização</Label>
                            <Input id="address" name="address" placeholder="Digite o endereço (opcional)" />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Cadastrando..." : "Cadastrar Academia"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

