import SignUpForm from "./signup-form"
import Image from "next/image"

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Coluna do Formulário */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Criar Conta</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>

      {/* Coluna da Imagem */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-primary/60" />
        <Image 
          src="/placeholder.svg?height=1080&width=1920"
          alt="Sign up background"
          className="object-cover"
          priority
          fill
        />
      </div>
    </div>
  )
}

