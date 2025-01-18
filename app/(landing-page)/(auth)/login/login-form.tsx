'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { auth } from "@/lib/firebase"
import api from "@/lib/api/axios-instance"
import { setAuthCookies } from "../../../actions/auth"
import type { LoginResponse } from "@/types/auth"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Login no Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const idToken = await userCredential.user.getIdToken()

      // Chamada para a API
      console.log(api);
      
      const response = await api.post<LoginResponse>('/api/v1/login', { idToken })
      const { access_token, refreshtoken, is_signup_finished, plan } = response.data

      // Salva os cookies no servidor
      await setAuthCookies(access_token, refreshtoken, is_signup_finished, plan)

      router.refresh()

      router.push("/dashboard")
      
    } catch (error) {
      console.error('Erro ao realizar login:', error)
      setError("Email ou senha inválidos")
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
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          name="password"
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
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      <div className="space-y-2 text-center text-sm">
        <a 
          href="#" 
          className="block text-primary hover:underline"
          onClick={(e) => e.preventDefault()}
        >
          Esqueceu sua senha?
        </a>
        <div>
          Ainda não possui conta?{" "}
          <Link 
            href="/signup" 
            className="text-primary hover:underline"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </form>
  )
}