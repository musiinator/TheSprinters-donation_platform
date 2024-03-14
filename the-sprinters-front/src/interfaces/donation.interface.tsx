import { CharityCase } from '@/src/interfaces/charity-case.interfaces';
import { DeliveryInfo } from './delivery-info.interface';
import { DeliveryMethod } from '../enums/DeliveryMethod';

export interface Donation {
  note: string;
  donationDate: string;
  username: string;
  deliveryMethod: DeliveryMethod;
  items: Item[];
  deliveryInfo: DeliveryInfo;
  charityCase: CharityCase;
};

export const itemsForDonationMap = {
  clothes: 'donate-now/clothes.png',
  food: 'donate-now/food.png',
  toys: 'donate-now/toys.png',
  books: 'donate-now/books.png',
  shoes: 'donate-now/shoes.png',
  electronics: 'donate-now/electronics.png',
};
