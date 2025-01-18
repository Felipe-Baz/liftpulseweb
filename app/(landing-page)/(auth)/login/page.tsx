import LoginForm from "./login-form"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Coluna do Formulário */}
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Entre com sua conta para continuar
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

