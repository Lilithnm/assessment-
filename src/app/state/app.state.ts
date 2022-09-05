import { CustomerState } from './customer/customer.reducer';

export interface AppState {
  customers: CustomerState;
}
