import { createReducer, on } from '@ngrx/store';
import { addCustomer, loadCustomers, loadCustomersSuccess, loadCustomersFailure} from './customer.actions';
import { Customer } from 'src/app/models/customer.model';

export interface CustomerState {
  customers: Customer[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CustomerState = {
  customers: [],
  error: '',
  status: 'pending',
};

export const customerReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new customer to the customers array
  on(addCustomer, (state, { content }) => ({
    ...state,
    customers: [...state.customers, { Id: 0, content: content }],
  })),
  // Trigger loading the customers
  on(loadCustomers, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded customers
  on(loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers: customers,
    error: "",
    status: 'success',
  })),
  // Handle customers load failure
  on(loadCustomersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);