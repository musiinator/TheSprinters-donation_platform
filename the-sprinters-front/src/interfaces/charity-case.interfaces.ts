import { Organization } from '@/src/interfaces/organization';
import { Person } from '@/src/interfaces/person.interface';

export interface CharityCase {
  id: number;
  familyName: string;
  familyImage: string;
  nrBoys: number;
  nrGirls: number;
  nrChildren: number;
  organization: Organization;
  city: string;
  county: string;
  country: string;
  persons: Person[];
}
