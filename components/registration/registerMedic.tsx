"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Control, useForm } from "react-hook-form"
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
  useFormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { HTMLInputTypeAttribute, useState } from "react"
import { PathRoutesEnum } from "@/server/pathRoutes"
import clsx from "clsx"
import { CheckboxDemo } from "../ui/Shared/Checkbox"

type TitleForm = "email" | "name" | "password" | "phone"

type FormInputComponentProps ={
  name:TitleForm 
  formLabel: string
  className?: string
  placeholder: string
  type?: HTMLInputTypeAttribute 
  control?:  Control<{ email: string; name: string; password: string;phone: string; }, any> | undefined
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInputComponent = ({
  name,
  formLabel,
  placeholder,
  type,
  control,
  value,
  className,
  onChange,
}: FormInputComponentProps) => {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={clsx("relative max-w-xl w-full", className)}>
       
        <FormLabel className="absolute bg-white -top-0 dark:bg-black text-xs sm rounded-lg  left-4 px-2">{formLabel}</FormLabel>
        <FormControl >
          <Input  placeholder={placeholder} type={type} {...field}  onChange={onChange ? onChange : field.onChange} value={value}/>
        </FormControl>
        <FormMessage  className="text-xs absolute  -bottom-5 left-0"/>
      </FormItem>
    )}
  />
  )
}

export function CreateMedicForm() {
    const [ generatedPassword, setGeneratedPassword ] = useState('')
  const { toast } = useToast()

  const formSchema = z.object({
    name: z.string().min(2, {
    message: "O nome da clínica deve ser preenchido",
  }),
  email: z.string().min(2, {
    message: "O email deve ser preenchido",
  }),
  phone: z.string().min(2, {
    message: "O telefone da clínica deve ser preenchido",
  }),
  password: z.string().min(0, {
    message: "A senha deve ser preenchida",
  }),
  })
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: generatedPassword,
    },
  })

  const formsData: FormInputComponentProps[] = [{
    name:"name",
    formLabel:"Nome médico",
    placeholder:"Digite o nome do médico",
    type:"text",
  },{
    name:"email",
    formLabel:"Email",
    placeholder:"Digite o email",
    type:"text",
  },{
    name:"phone",
    formLabel:"Telefone",
    placeholder:"Digite o telefone",
    type:"number",
  }]

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values) {
      toast({ title: "Erro ao cadastrar médico", duration: 3000, variant: "destructive" })
        console.log('erro')
    } else {
      toast({ title: "Médico cadastrado com sucesso!", duration: 3000, variant: "default" })
        console.log(values)
    }
  }

  function generatePassword(): string {
    let chars: string = '123456789abcdefghjklmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ?!@&*()[]';
    let password: string = '';

    for (let i: number = 0; i < 16; i++) {
        const randomNumber: number = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    } 
    setGeneratedPassword(password);
    return password;
}

  return (
    <Form {...form} >  
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
      <div className="flex flex-wrap gap-6 max-w-7xl w-full">
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
        <div className="flex item-center w-full max-w-xl gap-4">
            <FormInputComponent 
                name="password"
                formLabel="Senha"
                value={generatedPassword}
                placeholder="Digite a senha"
                type="text"
                control={form.control ? form.control : undefined}
            />
            <Button 
                className="mt-2 hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
                onClick={() => generatePassword()}
                type="button"
            >Gerar senha</Button>
        </div>
    </div>
      <div className="flex flex-col w-fit">
        <CheckboxDemo />
        <Button
          className="hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
          type="submit"
        >
          Avançar
        </Button>
      </div>
      </form>
    </Form>
  )
}
