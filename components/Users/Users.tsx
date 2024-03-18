import { getClinics } from "@/server/routes/clinics/getClinics"
import { getHospitals } from "@/server/routes/hospitals/getHospitals"
import { getMedicalExams } from "@/server/routes/medical-exams/getMedicalExams"
import { getOfferContracts } from "@/server/routes/offer-contracts/getOfferContracts"
import { getUsers } from "@/server/routes/users/getUsers"

export default async function Users() {
  const users = await getUsers()
  const clinics = await getClinics()
  const hospitals = await getHospitals()
  // const offers = await getExamOffers()
  const contracts = await getOfferContracts()
  const exams = await getMedicalExams()

  return (
    <div className="">
      <h1 className="font-bold">Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <h1 className="font-bold">Clinics</h1>
      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id}>{clinic.name}</li>
        ))}
      </ul>

      <h1 className="font-bold">Hospitals</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>{hospital.name}</li>
        ))}
      </ul>

      {/* <h1 className="font-bold">Exam Offers</h1>
            <ul>
                {offers.map(offer => (
                    <li key={offer.id}>{offer.id}</li>
                ))}
            </ul> */}

      <h1 className="font-bold">Contracts</h1>
      <ul>
        {contracts.map((contract) => (
          <li key={contract.id}>{contract.hash}</li>
        ))}
      </ul>

      <h1 className="font-bold">Exams</h1>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id}>{exam.type}</li>
        ))}
      </ul>

      {/* <Button onClick={handleSignOut}>Sign out</Button> */}
    </div>
  )
}
