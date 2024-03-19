"use client"

import { PathRoutesEnum } from "@/server/routes/pathRoutes"

import useFetchData from "@/hooks/useFetchData"

export default function Users() {
  const { data, loading } = useFetchData(PathRoutesEnum.USERS)

  // const users = await getUsers()
  // const clinics = await getClinics()

  // const hospitals = await getHospitals()
  // // const offers = await getExamOffers()
  // const contracts = await getOfferContracts()
  // const exams = await getMedicalExams()
  // const offerContractById = await getOfferContractById({
  //   id: "9390feef-583f-4cdb-a56f-632a5d428af4",
  // })
  // const user = await getUserById("3448f442-4ea2-4388-b52c-d1f4d7c32a33")

  return (
    <div className="">
      <h1 className="font-bold">Dashboard</h1>

      <h1 className="font-bold">Create Clinic</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(data?.data, null, 2)}</p>
      )}

      {/* <Button onClick={handleCreateClinic}>Create Clinic</Button> */}
      <h1 className="font-bold">offerContractById</h1>
      {/* <p>{JSON.stringify(offerContractById, null, 2)}</p>
      <h1 className="font-bold">User</h1>
      {user && <p>{JSON.stringify(user, null, 2)}</p>}
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
      </ul> */}

      {/* <Button onClick={handleSignOut}>Sign out</Button> */}
    </div>
  )
}
