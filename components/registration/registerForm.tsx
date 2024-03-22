"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldValues, useForm, useFormContext } from "react-hook-form"
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
import { HTMLInputTypeAttribute } from "react"
import { useState } from "react"
import useFetchData from "@/hooks/useFetchData"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { useRouter } from "next/navigation"
import { useCustomMutation } from "@/hooks/useMutationData"
import { v4 as uuidv4 } from 'uuid';
import { CheckboxDemo } from "../ui/Shared/Checkbox"

type TitleForm = "number" | "name" | "street" | "district" | "city" | "state" | "phone"

type FormInputComponentProps ={
  name:TitleForm 
  formLabel: string
  placeholder: string
 
  type?: HTMLInputTypeAttribute 
  control?:  Control<{ number: string;
    name: string;
    street: string;
    district: string;
    city: string;
    state: string;
    phone: string;
    id: string;
    createdAt: string;
    active: boolean;
  }, any> | undefined
}

const FormInputComponent = ({
  name,
  formLabel,
  placeholder,
  type,
  control,
}: FormInputComponentProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="relative">
       
        <FormLabel className="absolute bg-white -top-0 dark:bg-black text-xs sm rounded-lg  left-4 px-2">{formLabel}</FormLabel>
        <FormControl >
          <Input placeholder={placeholder} type={type} {...field} />
        </FormControl>
        <FormMessage  className="text-xs absolute  -bottom-5 left-0"/>
      </FormItem>
    )}
  />
  )
}

export function ProfileForm() {

  const router = useRouter()
const { mutate, isPending } = useCustomMutation(PathRoutesEnum.CLINICS, {
  method: 'POST',
  onSuccess: () => toast({ title: "Sucesso ao cadastrar", duration: 3000, variant: "default" }),
  onError: () => toast({ title: "Erro ao cadastrar", duration: 3000, variant: "destructive" }),
});



  const { toast } = useToast()


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
  id: z.string(),
  createdAt: z.string(),
  active: z.boolean(),
  })
  
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
      id: uuidv4() || "",
      createdAt: new Date().toISOString(),
      active: true,
    },
  })

  const formsData: FormInputComponentProps[] = [{
    name:"name",
    formLabel:"Nome da Clínica/Hospital",
    placeholder:"Digite o nome da clínica/hospital",
    type:"text",
   
  },{
    name:"street",
    formLabel:"Rua",
    placeholder:"Digite a rua",
    type:"text",
   
  },{
    name:"number",
    formLabel:"Número",
    placeholder:"Digite o número",
    type:"number",
   
  },{
    name:"district",
    formLabel:"Bairro",
    placeholder:"Digite o bairro",
    type:"text",
   
  },{
    name:"city",
    formLabel:"Cidade",
    placeholder:"Digite a cidade",
    type:"text",
   
  },{
    name:"state",
    formLabel:"Estado",
    placeholder:"Digite o estado",
    type:"text",
   
  }, {
    name:"phone",
    formLabel:"Telefone",
    placeholder:"Digite o telefone",
    type:"number",
  
  }]

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) {
      
        console.log('erro')
    } else {
      console.log(values)
      // Estrutura de dados a ser passada para mutate
      mutate({
        body: values,

      })
    
    }
  }

  if(isPending) return <p>Loading...</p>

  return (
    <Form {...form}>  
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid grid-cols-2 gap-6 max-w-7xl w-full">
        {formsData.map((input, idx) =>{
          return(
            <FormInputComponent
            key={idx} 
            name={input.name}
            formLabel={input.formLabel}
            placeholder={input.placeholder}
            type={input.type}
            control={form.control ? form.control : undefined}
          />
          )
        })} 
      </div>
      <div className="flex flex-col w-fit">
        <CheckboxDemo />
        <Button
          // onClick={() => toast({ title: "Cadastrado com sucesso!", duration: 3000, variant: "default" })}
          className="hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
          type="submit"
        >
          Cadastrar
        </Button>
      </div>
      </form>
    </Form>
  )
}

