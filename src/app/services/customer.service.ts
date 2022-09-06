import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model'; 
import { customers } from './data';

@Injectable({ providedIn: 'root' })
export class CustomerService {

  customers = customers;
  
  constructor() {    
    localStorage.setItem('customers', JSON.stringify(this.customers))
  }

  async getCustomers(): Promise<Customer[]> {
    return (await JSON.parse(localStorage.getItem('customers')||'') || []);
  }

  async saveCustomers(customers: Customer[]) {
    console.log(customers)
    return localStorage.setItem('customers', JSON.stringify(customers));
  }
}


