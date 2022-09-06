import { createReducer, on } from '@ngrx/store';
import { addCustomer, loadCustomers, loadCustomersSuccess, loadCustomersFailure, removeCustomer, editCustomer} from './customer.actions';
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
  on(addCustomer, (state, { data }) => ({
    ...state,
    customers: [...state.customers, { Id: crypto.randomUUID(),
               FirstName : data.FirstName, LastName: data.LastName, Status: data.Status, Email: data.Email, Phone: data.Phone }],
  })),
  
  on(editCustomer, (state, { data }) => ({
    ...state,
    customers: state.customers.map(current => {
          if(current.Id ==data.Id){
            return data
          }
          else
            return current
        })
  })),
  
  // Remove the customer from the customers array
  on(removeCustomer, (state, { Id }) => ({
    ...state,
    customers: state.customers.filter((customer) => customer.Id !== Id),
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
