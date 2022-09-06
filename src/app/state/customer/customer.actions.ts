import { createAction, props } from '@ngrx/store';
import { Customer } from '../../models/customer.model';

export const addCustomer = createAction(
  '[Customer Page] Add Customer',
  props<{ data: Customer }>()
);

export const removeCustomer = createAction(
  '[Customer Page] Remove Customer',
  props<{ Id: string }>()
);
export const editCustomer = createAction(
  '[Customer Page] Edit Customer',
  props<{data: Customer }>()
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
