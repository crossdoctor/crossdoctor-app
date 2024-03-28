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
    title: "Referencia",
  },
  {
    title: "Quantidade",
  },
  {
    title: "Status",
  },
  {
    title: "Exames",
  },
  {
    title: "Medico",
  },
  {
    title: "Hospital",
  },
]

const OfferTable = () => {
  const [filtrado, setFiltrado] = useState("")

  const { data: offers, loading: loadingOffers } = useFetchData(
    PathRoutesEnum.OFFER_CONTRACTS
  )

  const router = useRouter()

  const dataFiltered = offers?.filter((offers) =>
    offers.hash.toLowerCase().includes(filtrado.toLowerCase())
  )

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between space-x-10 px-4 pb-4">
        <form className="flex items-center gap-2">
          <Input
            name="name"
            value={filtrado}
            onChange={(e) => setFiltrado(e.target.value)}
            placeholder="Referencia do contrato"
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
          onClick={() => router.push("/dashboard/registration/clinic-register")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Novo Contrato
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
            {dataFiltered?.map((offers, i) => (
              <TableRow key={i}>
                <TableCell>{offers.hash}</TableCell>
                <TableCell>01</TableCell>
                {/* ACREDITO QUE SEJA ALGUM PROBLEMA NA ROTA POIS NAO E POSSIVEL ACESSAR {offers.examOffer} */}
                <TableCell>
                  {offers.active === true ? "Ativo" : "Inativo"}
                </TableCell>
                <TableCell>Raio X</TableCell>
                <TableCell>{offers.user.name}</TableCell>
                <TableCell>{offers.user.headquarter.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OfferTable
