"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { updateBranch } from "@/actions/branches"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().max(500),
  address: z.string().min(5),
  phone: z.string().min(10),
  openingHours: z.string(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().url().optional(),
})

interface GymProfileFormProps {
  initialData: {
    id: string;
    name: string;
    address?: string;
    description?: string;
    openingHours?: string;
    facebook?: string;
    createdAt?: string;
    updatedAt?: string;
    phoneNumber?: string;
    instagram?: string;
    website?: string;
    image?: string;
  }
}

export function GymProfileForm({ initialData }: GymProfileFormProps) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData,
  })

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {

    try {
      const updatedBranch = await updateBranch(
        initialData.id,
        values.name,
        values.description,
        values.address,
        values.phone,
        values.openingHours,
        values.instagram || "",
        values.facebook || "",
        values.website || "",
        ""
      );

      if (updatedBranch) {
        // Lógica após a atualização bem-sucedida, como feedback para o usuário

        //TODO: Adicionar logica para imagem de perfil
      }
    } catch (error) {
      console.error("Erro ao atualizar a filial:", error);
    }
  }

  return (
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
      }} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative h-32 w-32">
              <Image
                src={initialData.image && initialData.image !== "" ? initialData.image : "/placeholder.png"}
                alt="Logo da academia"
                className="rounded-lg object-cover"
                width={128}
                height={128}
              />

              <Button type="button" variant="secondary" size="icon" className="absolute bottom-2 right-2">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-medium">Foto da Academia</h3>
              <p className="text-sm text-muted-foreground">
                Esta imagem será exibida publicamente. Recomendamos uma imagem de pelo menos 300x300px.
              </p>
            </div>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da Academia</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome da academia" {...field} />
                </FormControl>
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
                    placeholder="Descreva sua academia..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Máximo de 500 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o endereço"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="openingHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Horário de Funcionamento</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Seg-Sex: 6h-22h, Sáb: 8h-18h"
                    {...field}
                    value={field.value ?? ""} // Garante que o value nunca seja null
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Redes Sociais</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@suaacademia"
                        {...field}
                        value={field.value ?? ""} // Garante que o value nunca seja null
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="facebook.com/suaacademia"
                        {...field}
                        value={field.value ?? ""} // Garante que o value nunca seja null
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.suaacademia.com"
                      {...field}
                      value={field.value ?? ""} // Garante que o value nunca seja null
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            onClick={() => form.handleSubmit(onSubmit)()}
          >
            Salvar Alterações
          </Button>
        </div>

      </form>
    </Form>
  )
}

