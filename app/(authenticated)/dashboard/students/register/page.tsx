"use client"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { addStudent } from "@/actions/student"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import { useBranch } from "@/contexts/branch-context"

const formSchema = z.object({
  username: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  birthdate: z.string().min(1, "Data de nascimento é obrigatória"),
  phonenumber: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  gender: z.enum(["M", "F"], {
    required_error: "Por favor selecione o gênero",
  }),
  goal: z.enum(["emagrecer", "hipertrofia", "secar", "flexibilidade", "massa_magra", "Apreder_o_basico"], {
    required_error: "Por favor selecione um objetivo",
  }),
  activity_level: z.enum(["beginner", "intermediate", "advanced", "true_beast"], {
    required_error: "Por favor selecione o nível de atividade",
  }),
  status: z.enum(["active", "inactive", "blocked"], {
    required_error: "Por favor selecione o status",
  }),
  groups: z.array(z.string()),
})

export default function RegisterPage() {
  const router = useRouter();
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const { selectedBranch } = useBranch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [],
      status: "active",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const new_student = await addStudent(
      values.username,
      values.email,
      values.phonenumber,
      (selectedBranch?.id as string),
      values.birthdate,
      values.gender,
      values.goal,
      values.activity_level,
      ""
    );

    if (new_student) {
      // Lógica após a atualização bem-sucedida, como feedback para o usuário

      //TODO: Adicionar logica para imagem de perfil
      if (new_student.qrcode) {
        console.log(new_student.qrcode);
        setQrCode(new_student.qrcode);
        setShowQrModal(true);
      }
    }
  }

  return (
    <>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Cadastrar Novos Alunos</h1>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do aluno" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@exemplo.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Nascimento</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          className={cn("w-full", !field.value && "text-muted-foreground")}
                          {...field}
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o gênero" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o objetivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="emagrecer">Emagrecer</SelectItem>
                          <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                          <SelectItem value="secar">Secar</SelectItem>
                          <SelectItem value="flexibilidade">Flexibilidade</SelectItem>
                          <SelectItem value="massa_magra">Massa Magra</SelectItem>
                          <SelectItem value="Apreder_o_basico">Aprender o Básico</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="activity_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de Atividade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o nível" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Iniciante</SelectItem>
                          <SelectItem value="intermediate">Intermediário</SelectItem>
                          <SelectItem value="advanced">Avançado</SelectItem>
                          <SelectItem value="true_beast">Profissional</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Ativo</SelectItem>
                          <SelectItem value="inactive">Inativo</SelectItem>
                          <SelectItem value="blocked">Bloqueado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Cadastrar
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escanear pelo App</DialogTitle>
            <DialogDescription>O aluno deve escanear o QRCode para receber acesso ao App.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <QRCode value={qrCode} size={400} />
          </div>
          <Button
            onClick={() => {
              router.push("/dashboard/students")
            }}
          >
            Ir a listagem de Alunos
          </Button>
        </DialogContent>
      </Dialog>
    </>

  )
}
