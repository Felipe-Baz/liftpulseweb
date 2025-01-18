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
    </div>
  )
}

