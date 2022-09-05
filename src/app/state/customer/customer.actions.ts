import { createAction, props } from '@ngrx/store';
import { Customer } from '../../models/customer.model';

export const addCustomer = createAction(
  '[Customer Page] Add Customer',
  props<{ data: Customer }>()
);

export const loadCustomers = createAction('[Customer Page] Load Customers');

export const loadCustomersSuccess = createAction(
  '[Customer API] Customer Load Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer API] Customer Load Failure',
  props<{ error: string }>()
);
