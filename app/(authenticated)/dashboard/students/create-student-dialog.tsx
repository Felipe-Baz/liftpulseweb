"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addStudent } from "@/actions/student"

const formSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  birthdate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  phonenumber: z.string().min(10).max(15),
  gender: z.enum(["M", "F"]),
  goal: z.enum(["emagrecer", "hipertrofia", "secar", "flexibilidade", "massa_magra", "Apreder_o_basico"]),
  activity_level: z.enum(["beginner", "intermediate", "advanced", "true_beast"]),
  groups: z.array(z.string()).default([]),
  status: z.enum(["active", "inactive", "blocked"]),
})

interface StudentDialogFormProps {
  branchId: string
}

export function CreateStudentDialog({ branchId }: StudentDialogFormProps) {
  const [open, setOpen] = useState(false)
  const [showQrModal, setShowQrModal] = useState(false);
  const [qrCode, setQrCode] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      birthdate: "",
      phonenumber: "",
      gender: "M",
      goal: "emagrecer",
      activity_level: "beginner",
      groups: [],
      status: "active",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false)
    form.reset()

    try {
      const new_student = await addStudent(
        values.username,
        values.email,
        values.phonenumber,
        branchId,
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
          console.log('====================================');
          console.log(new_student.qrcode);
          console.log('====================================');
          setQrCode(new_student.qrcode);
          setShowQrModal(true);
        }
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Aluno
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Aluno</DialogTitle>
            <DialogDescription>Adicione um novo aluno ao sistema. Clique em salvar quando terminar.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(
                (values) => {
                  onSubmit(values);
                },
                (errors) => {
                  console.log("❌ Erros no formulário:", errors);
                }
              )();
            }} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome..." {...field} />
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
                      <Input placeholder="Digite o email..." type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Nascimento</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
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
                    <FormLabel>Número de Telefone/Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o número de telefone..." {...field} />
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
                    <FormLabel>Genero</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Genero" />
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
                          <SelectValue placeholder="Selecione o Objetivo" />
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
                    <FormLabel>Nivel de atividade</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o Nivel de atividade" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Iniciante</SelectItem>
                        <SelectItem value="intermediate">Intermediario</SelectItem>
                        <SelectItem value="advanced">Avançado</SelectItem>
                        <SelectItem value="true_beast">Fera Absoluta</SelectItem>
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
                          <SelectValue placeholder="Selecione o status" />
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
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escanear pelo App</DialogTitle>
            <DialogDescription>O aluno deve escanear o QRCode para receber acesso ao App.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center">
            <QRCode value={qrCode} size={400} />
          </div>
            
        </DialogContent>
      </Dialog>
    </>
  )
}

