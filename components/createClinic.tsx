import { useState } from "react"
import { Clinic } from "@/server/routes/types"

import { Button } from "./ui/button"

const CreateClinic = () => {
  const [clinicData, setClinicData] = useState<Partial<Clinic>>({
    name: "Clínica ABC1234",
    street: "Rua ABC",
    number: "123",
    district: "Bairro ABC",
    city: "Cidade ABC",
    state: "Estado ABC",
    phone: "(11) 99123-4567",
  })
  return (
    <div>
      <Button>Create Clinic</Button>
    </div>
  )
}

export default CreateClinic
