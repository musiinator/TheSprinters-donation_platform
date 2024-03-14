import { DeliveryCompany } from "../enums/DeliveryCompany";

export interface DeliveryInfo {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  deliveryCompany: DeliveryCompany;
};
