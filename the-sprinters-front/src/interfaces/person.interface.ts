import { CharityCase } from '@/src/interfaces/charity-case.interfaces';

export interface Person {
  firstName: string;
  lastName: string;
  age: number;
  description: string;
  child: boolean;
  gender: GenderEnum;
  charityCaseId: number;
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
