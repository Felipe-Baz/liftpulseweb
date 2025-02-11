'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { setAuthCookies } from "@/app/actions/auth"
import { signupAPI } from "@/actions/auth"
import { SignupData } from "@/types/auth"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const earlyCode = formData.get("earlyCode") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword")

    try {
      if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem")
      }
      
      const request : SignupData = {
        username: name,
        email,
        password,
        role: "GYM",
        earlyCode: earlyCode
      }

      // Simula uma chamada de API
      var response = await signupAPI(request);

      setAuthCookies(response.access_token, response.refreshtoken);

      // Aqui você adicionaria sua lógica de criação de conta
      router.push("/login")
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ocorreu um erro ao criar conta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="João Silva"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="earlyCode">Early Access Cupom</Label>
        <Input
          id="earlyCode"
          name="earlyCode"
          type="text"
          placeholder="Codigo de acesso ao early Acess"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>

      <div className="text-center text-sm">
        Já possui uma conta?{" "}
        <Link 
          href="/login" 
          className="text-primary hover:underline"
        >
          Fazer login
        </Link>
      </div>
    </form>
  )
}

