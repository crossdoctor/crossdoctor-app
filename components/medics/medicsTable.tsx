"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PathRoutesEnum } from "@/server/pathRoutes"
import { PlusCircle, Search } from "lucide-react"

import useFetchData from "@/hooks/useFetchData"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const tableHeaderCell: { title: string }[] = [
  {
    title: "Name",
  },
  {
    title: "Email",
  },
  {
    title: "Phone",
  },
  {
    title: "Password",
  },
  {
    title: "Ofertas",
  },
  {
    title: "Status",
  },
]

const MedicsTable = () => {
  const [filtrado, setFiltrado] = useState("")
  const { data: users, loading: loadingUsers } = useFetchData(
    PathRoutesEnum.USERS
  )

  const router = useRouter()

  const dataFiltered = users?.filter((users) =>
    users.email.toLowerCase().includes(filtrado.toLowerCase())
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between space-x-10 px-4 pb-4">
        <form className="flex items-center gap-2">
          <Input
            name="name"
            value={filtrado}
            onChange={(e) => setFiltrado(e.target.value)}
            placeholder="Nome do médico"
            className="w-auto"
          />
          <Button type="button" variant="link">
            <Search className="w-4 h-4 mr-2" />
            Filtrar resultados
          </Button>
        </form>
        <Button
          className="hover:scale-105 hover:text-white hover:bg-teal-500 transition-all duration-500"
          type="button"
          onClick={() => router.push("/dashboard/registration/medic-register")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo Médico
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
            {dataFiltered?.map((users, i) => (
              <TableRow key={i}>
                {/* <TableCell>{users.name}</TableCell> O "USERS" nao tem a props name, phone ou password, entao deixei comentado para que a gente verifique depois como fazer */}
                <TableCell>{users.email}</TableCell>
                {/* <TableCell>{users.phone}</TableCell>
              <TableCell>{users.password}</TableCell> */}
                <TableCell>Ofertas</TableCell>
                <TableCell>
                  {users.active === true ? "Ativo" : "Inativo"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default MedicsTable
