"use client"

import { PathRoutesEnum } from "@/server/pathRoutes"

import useFetchData from "@/hooks/useFetchData"

export default function Users() {
  const { data: users, loading: loadingUsers } = useFetchData(
    PathRoutesEnum.USERS
  )
  const { data: clinics, loading: loadingClinics } = useFetchData(
    PathRoutesEnum.CLINICS
  )
  const { data: examsOffers, loading: loadingExamOffers } = useFetchData(
    PathRoutesEnum.EXAM_OFFERS
  )
  const { data: offers, loading: loadingOffers } = useFetchData(
    PathRoutesEnum.OFFER_CONTRACTS
  )
  const { data: hospitals, loading: loadingHospitals } = useFetchData(
    PathRoutesEnum.HOSPITALS
  )
  const { data: exams, loading: loadingExams } = useFetchData(
    PathRoutesEnum.MEDICAL_EXAMS
  )

  return (
    <div className="">
      {/* <p>Users</p>
      {loadingUsers ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(users, null, 2)}</p>
      )}

      <p>Clinics</p>
      {loadingClinics ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(clinics, null, 2)}</p>
      )}

      <p>Exams Offers</p>
      {loadingExamOffers ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(examsOffers, null, 2)}</p>
      )}

      <p>Offers</p>
      {loadingOffers ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(offers, null, 2)}</p>
      )}

      <p>Hospitals</p>
      {loadingHospitals ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(hospitals, null, 2)}</p>
      )}

      <p>Exams</p>
      {loadingExams ? (
        <p>Loading...</p>
      ) : (
        <p>{JSON.stringify(exams, null, 2)}</p>
      )} */}
    </div>
  )
}
