'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useFetchData from "@/hooks/useFetchData"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { PlusCircle, Search } from 'lucide-react'
import { useRouter } from "next/navigation"
import { useState } from "react"

const tableHeaderCell:{title:string}[] = [
    {
      title: "Name",
    },
    {
      title: "Street,number",
    },
    {
      title: "City",
    },
    {
      title: "State",
    },
    {
      title: "Phone",
    },
    {
      title: "Status",
    },
    {
      title: "Medicos",
    },
    {
      title: "Ofertas",
    },
  ]


const ClinicsTable = () => {
    const [filtrado, setFiltrado] = useState("")
    const { data: clinics, loading: loadingClinics } = useFetchData(
        PathRoutesEnum.CLINICS
      )
    
    const router = useRouter()

    const dataFiltered = clinics?.filter(
        (clinic) => clinic.name.includes(filtrado))

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between space-x-10 px-4 pb-4">
          <form className="flex items-center gap-2">
            <Input name="name" value={filtrado} onChange={(e) => setFiltrado(e.target.value)} placeholder="Nome da clinica" className="w-auto"/>
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
            <TableRow>
                {tableHeaderCell?.map((cell, i) => (
                  <TableHead key={i}>{cell.title}</TableHead>
                ))}
              
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataFiltered?.map((clinic, i) => (
              <TableRow key={i}>
              <TableCell>{clinic.name}</TableCell>
              <TableCell>{clinic.street},{clinic.number}-{clinic.district}</TableCell>
              <TableCell>{clinic.city}</TableCell>
              <TableCell>{clinic.state}</TableCell>
              <TableCell>{clinic.phone}</TableCell>
              <TableCell>{clinic.active}</TableCell>
              <TableCell>DR. ABREU</TableCell>
              <TableCell>Ofertas</TableCell>
            </TableRow>
                  ))}
            </TableBody>
          </Table>
          </div>
      </div>
  )
}

export default ClinicsTable