import * as yup from "yup";

const headquarterSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  phone: yup.string().required(),
  district: yup.string().required(),
});

const userSchema = yup.object().shape({
  id: yup.string().required(),
  email: yup.string().email().required(),
  lastLoginAt: yup.string().required(), // Ou yup.date() se você for converter para Date
  headquarter: headquarterSchema,
  createdAt: yup.string().required(), // Ou yup.date()
  active: yup.boolean().required(),
});

const clinicSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  phone: yup.string().required(),
  createdAt: yup.string().required(),
  active: yup.boolean().required(),
});

const hospitalSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  street: yup.string().required(),
  number: yup.string().required(),
  district: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  phone: yup.string().required(),
  createdAt: yup.string().required(),
  active: yup.boolean().required(),
});

const medicalExamsSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  // type: yup
  //   .mixed<MedicalExamTypeEnum>()
  //   .oneOf(Object.values(MedicalExamTypeEnum))
  //   .required(),
  type: yup.string().required(),
  createdAt: yup.string().required(),
});

const offerContractsHeadquarterSchema = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
});

const offerContractsUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  headquarter: offerContractsHeadquarterSchema,
});

const offerContractsSchema = yup.object().shape({
  id: yup.string().required(),
  hash: yup.string().required(),
  createdAt: yup.string().required(), // Ou yup.date() se for converter para Date
  active: yup.boolean().required(),
  user: offerContractsUserSchema,
});

const examsOffersSchema = yup.object().shape({});

export {
  clinicSchema,
  examsOffersSchema,
  headquarterSchema,
  hospitalSchema,
  medicalExamsSchema,
  offerContractsSchema,
  userSchema,
};
