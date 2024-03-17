export type Headquarter = {
  id: string;
  name: string;
  city: string;
  state: string;
  phone: string;
  district: string;
};

export type User = {
  id: string;
  email: string;
  lastLoginAt: string; // ou Date se você pretende converter a string de data ISO para um objeto Date
  headquarter: Headquarter;
  createdAt: string; // ou Date, similar ao lastLoginAt
  active: boolean;
};

export interface Clinic {
  id: string;
  name: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  phone: string;
  createdAt: string;
  active: boolean;
}

export type Hospital = {
  id: string;
  name: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  phone: string;
  createdAt: string;
  active: boolean;
};

export type MedicalExams = {
  id: string;
  name: string;
  type: string; //ver com o renato
  createdAt: string; //ver com o renato
};

export enum MedicalExamTypeEnum {
  RAIOS_UV = "RAIOS_UV",
  RADIOATIVO = "RADIOATIVO",
}

export type OfferContracts = {
  id: string;
  hash: string;
  createdAt: string;
  active: boolean;
  user: {
    name: string;
    email: string;
    headquarter: {
      id: string;
      name: string;
    };
  }; //ver com o renato
};

export type ExamOffers = {};
