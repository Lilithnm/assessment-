import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CustomerState } from './customer.reducer';

export const selectCustomers = (state: AppState) => state.customers;
export const selectAllCustomers = createSelector(
  selectCustomers,
  (state: CustomerState) => state.customers
);
