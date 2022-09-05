import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model'; 

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private storageInitialised = false;

  constructor() {}

  async getCustomers(): Promise<Customer[]> {
    return (await JSON.parse(localStorage.getItem('customers')||'') || []);
  }

  async saveCustomers(customers: Customer[]) {
    return localStorage.setItem('customers', JSON.stringify(customers));
  }
}
