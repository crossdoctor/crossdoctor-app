'use client'

import { Button } from "@/components/ui/button"
import InnerStickyHeader from "@/components/ui/innerStickyHeader"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, PlusCircle } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function Home(this: any) {

  const router = useRouter()

  return (
    <main className="relative w-full">
      <InnerStickyHeader title="Clínicas" description="Clínicas" />

      <div className="p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between space-x-10 px-4 pb-4">
          <form className="flex items-center gap-2">
            <Input name="name" placeholder="Nome da clinica" className="w-auto"/>
            <Input name="medic" placeholder="Nome do medico" className="w-auto"/>
            <Button type="submit" variant={"link"}>
              <Search className="w-4 h-4 mr-2" />
              Filtrar resultados
            </Button>
          </form>
          <Button
            className="hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
            type="button"
            onClick={() => router.push("/dashboard/registration/clinic-register")}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Nova Clínica
          </Button>
        </div>
        <div className="border rounded-lg p-2">
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
              <TableHead>Street,number</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Medicos</TableHead>
              <TableHead>Ofertas</TableHead>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
              <TableCell>Diego {i}</TableCell>
              <TableCell>Rua Valkirias, 208</TableCell>
              <TableCell>Lapa</TableCell>
              <TableCell>Rio de Janeiro</TableCell>
              <TableCell>12312323-123</TableCell>
              <TableCell>Ativo</TableCell>
              <TableCell>DR. ABREU</TableCell>
              <TableCell>Ofertas</TableCell>
            </TableRow>
                  ))}
            </TableBody>
          </Table>
          </div>
      </div>
    </main>
  )
}
