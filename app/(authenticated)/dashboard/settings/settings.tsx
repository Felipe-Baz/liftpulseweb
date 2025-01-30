"use client"

import { useTheme } from "next-themes";
import { zodResolver } from "@hookform/resolvers/zod"
import { Bell, Laptop, Moon, Shield, Sun, Trash2, User } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";

const appearanceFormSchema = z.object({
  theme: z.enum(["light", "dark", "system"], {
    required_error: "Please select a theme.",
  }),
})

const notificationsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
  monthlyNewsletter: z.boolean().default(true),
})

const deleteAccountFormSchema = z.object({
  confirmEmail: z.string().email({
    message: "Por favor, insira seu email para confirmar.",
  }),
  deleteReason: z.string().min(10, {
    message: "Por favor, nos diga por que você está deletando sua conta.",
  }),
})

export function Settings() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = (resolvedTheme as "light" | "dark" | "system") || "system";

  const appearanceForm = useForm<z.infer<typeof appearanceFormSchema>>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      theme: currentTheme,
    },
  })

  const notificationsForm = useForm<z.infer<typeof notificationsFormSchema>>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      monthlyNewsletter: true,
    },
  })

  const deleteAccountForm = useForm<z.infer<typeof deleteAccountFormSchema>>({
    resolver: zodResolver(deleteAccountFormSchema),
  })

  useEffect(() => {
    appearanceForm.setValue("theme", (theme as "light" | "dark" | "system") || "system");
  }, [theme, appearanceForm]);

  return (
    <Tabs defaultValue="account" className="space-y-6">
      <TabsList>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Conta
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notificações
        </TabsTrigger>
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Moon className="h-4 w-4" />
          Aparência
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Segurança
        </TabsTrigger>
      </TabsList>

      <TabsContent value="account" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>Atualize suas informações pessoais e dados da conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Seu nome" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Salvar Alterações</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
            <CardDescription>Ações irreversíveis relacionadas à sua conta</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar Conta
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Form {...deleteAccountForm}>
                  <form className="space-y-6">
                    <DialogHeader>
                      <DialogTitle>Deletar Conta</DialogTitle>
                      <DialogDescription>
                        Esta ação é permanente e não pode ser desfeita. Todos os seus dados serão removidos
                        permanentemente.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <FormField
                        control={deleteAccountForm.control}
                        name="confirmEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirme seu email</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu email para confirmar" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={deleteAccountForm.control}
                        name="deleteReason"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Por que você está deletando sua conta?</FormLabel>
                            <FormControl>
                              <Input placeholder="Nos ajude a melhorar nossos serviços" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" type="button">
                        Cancelar
                      </Button>
                      <Button variant="destructive" type="submit">
                        Deletar Conta
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure como você deseja receber notificações</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...notificationsForm}>
              <form className="space-y-4">
                <FormField
                  control={notificationsForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações por Email</FormLabel>
                        <FormDescription>Receba atualizações importantes por email</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="pushNotifications"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notificações Push</FormLabel>
                        <FormDescription>Receba notificações em tempo real</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="marketingEmails"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Emails de Marketing</FormLabel>
                        <FormDescription>Receba ofertas e novidades</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={notificationsForm.control}
                  name="monthlyNewsletter"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Newsletter Mensal</FormLabel>
                        <FormDescription>Receba um resumo mensal das novidades</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <Button>Salvar Preferências</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="appearance" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Personalize como o aplicativo aparece para você</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...appearanceForm}>
              <form className="space-y-6">
                <FormField
                  control={appearanceForm.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tema</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            setTheme(value);
                          }}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <Label
                            htmlFor="light"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <RadioGroupItem value="light" id="light" className="sr-only" />
                            <Sun className="mb-2 h-6 w-6" />
                            Claro
                          </Label>
                          <Label
                            htmlFor="dark"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <RadioGroupItem value="dark" id="dark" className="sr-only" />
                            <Moon className="mb-2 h-6 w-6" />
                            Escuro
                          </Label>
                          <Label
                            htmlFor="system"
                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                          >
                            <RadioGroupItem value="system" id="system" className="sr-only" />
                            <Laptop className="mb-2 h-6 w-6" />
                            Sistema
                          </Label>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
            <CardDescription>Gerencie suas configurações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança à sua conta</p>
                </div>
                <Button variant="outline">Configurar</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Senha</Label>
                  <p className="text-sm text-muted-foreground">Última alteração há 3 meses</p>
                </div>
                <Button variant="outline">Alterar</Button>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Sessões Ativas</Label>
                  <p className="text-sm text-muted-foreground">Gerencie seus dispositivos conectados</p>
                </div>
                <Button variant="outline">Gerenciar</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

