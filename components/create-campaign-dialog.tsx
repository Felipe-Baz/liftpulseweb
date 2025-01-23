"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from 'lucide-react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "O título deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  type: z.string({
    required_error: "Por favor selecione um tipo de campanha.",
  }),
  startDate: z.date({
    required_error: "Por favor selecione uma data de início.",
  }),
  endDate: z.date({
    required_error: "Por favor selecione uma data de término.",
  }),
  budget: z.string().min(1, {
    message: "Por favor insira um orçamento.",
  }),
  target: z.string().min(1, {
    message: "Por favor insira um público alvo.",
  }),
})

export function CreateCampaignDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      target: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Implementar lógica de salvamento
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nova Campanha</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Nova Campanha</DialogTitle>
          <DialogDescription>
            Crie uma nova campanha promocional para sua academia
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-6 -mr-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Promoção Verão 2024" {...field} />
                    </FormControl>
                    <FormDescription>
                      O título principal da sua campanha
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva os detalhes da sua campanha"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Uma descrição clara dos benefícios e condições
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Campanha</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de campanha" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="discount">Desconto</SelectItem>
                        <SelectItem value="promotion">Promoção</SelectItem>
                        <SelectItem value="event">Evento</SelectItem>
                        <SelectItem value="challenge">Desafio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      O tipo de campanha que você deseja criar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-8 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Início</FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          className={cn(
                            "w-full px-3 py-2 border rounded-md text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          value={field.value ? field.value.toISOString().split("T")[0] : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          min="1900-01-01"
                          max={new Date().toISOString().split("T")[0]} // Limita ao dia atual
                        />
                      </FormControl>
                      <FormDescription>Quando a campanha começará</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data de Término</FormLabel>
                      <FormControl>
                        <input
                          type="date"
                          className={cn(
                            "w-full px-3 py-2 border rounded-md text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          value={field.value ? field.value.toISOString().split("T")[0] : ""}
                          onChange={(e) => field.onChange(new Date(e.target.value))}
                          min="1900-01-01"
                          max={new Date().toISOString().split("T")[0]} // Limita ao dia atual
                        />
                      </FormControl>
                      <FormDescription>Quando a campanha terminará</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Orçamento</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ex: 1000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Orçamento total para esta campanha em reais
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="target"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Público Alvo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Adultos 25-35 anos interessados em musculação"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Descreva o público que você deseja alcançar
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit">Criar Campanha</Button>
                <Button type="button" variant="outline">
                  Salvar Rascunho
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
