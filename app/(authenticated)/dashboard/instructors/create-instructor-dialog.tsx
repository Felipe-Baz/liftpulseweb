"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

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
import { addinstructor } from "@/actions/instructors"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres",
  }).max(50),
  email: z.string().email({
    message: "Email inválido",
  }),
  status: z.enum(["ativo", "inativo"]),
  birthdate: z.string(),
  phonenumber: z.string(),
  password: z.string(),
});


interface InstructorDialogProps {
  branchId: string;
}

export function CreateInstructorDialog({ branchId }: InstructorDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      birthdate: "",
      phonenumber: "",
      status: "ativo",
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setOpen(false)
    form.reset()

    try {
      const new_instructor = await addinstructor(
        values.name,
        values.email,
        values.phonenumber,
        branchId,
        values.birthdate,
        "",
        values.password,
      );
    } catch (error) {
      console.error("Erro ao criar instrutor:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Instrutor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Instrutor</DialogTitle>
          <DialogDescription>Adicione um novo instrutor ao sistema. Clique em salvar quando terminar.</DialogDescription>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
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
                    <Input placeholder="Digite o email..." {...field} />
                  </FormControl>
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
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
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
  )
}