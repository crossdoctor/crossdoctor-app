"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    name: z.string().min(2, {
    message: "O nome da clínica deve ser preenchido",
  }),
  street: z.string().min(2, {
    message: "O endereço da clínica deve ser preenchido",
  }),
  number: z.string().min(2, {
    message: "O número da clínica deve ser preenchido",
  }),
  district: z.string().min(2, {
    message: "O bairro da clínica deve ser preenchido",
  }),
  city: z.string().min(2, {
    message: "A cidade da clínica deve ser preenchida",
  }),
  state: z.string().min(2, {
    message: "O estado da clínica deve ser preenchido",
  }),
  phone: z.string().min(2, {
    message: "O telefone da clínica deve ser preenchido",
  }),
})

export function ProfileForm() {
    const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values === null) {
        console.log('erro')
    } else {
        console.log(values)
    }
  }
  return (
    <Form {...form}>  
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid grid-cols-2 gap-6 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Clínica/Hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da clínica/hospital" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o endereço da clínica/hospital" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o número da clínica/hospital." type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o bairro da clínica/hospital." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite a cidade da clínica/hospital." type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o estado da clínica/hospital." type="text" {...field} />
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
              <FormLabel>Telefone da clínica/hospital</FormLabel>
              <FormControl>
                <Input placeholder="Digite o telefone de contato." type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex flex-col w-fit">
        <Button
          onClick={() => toast({ title: "Cadastrado com sucesso!", duration: 3000, variant: "default" })}
          className="hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
        >
          Cadastrar
        </Button>
      </div>
      </form>
    </Form>
  )
}
