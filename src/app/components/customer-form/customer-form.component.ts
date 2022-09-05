import { map, startWith, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/models/customer.model';

import { addCustomer, loadCustomers } from '../../state/customer/customer.actions';
import { selectAllCustomers } from '../../state/customer/customer.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {

    destroy$: Subject<boolean> = new Subject<boolean>();

    public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    
    formCustomer: FormGroup;

    customerData: Customer=new Customer();
    statusList=[{option:'Active'},{option:'Pending'},{option:'Inactive'}];

    constructor(private fb: FormBuilder, 
      @Optional() @Inject(MAT_DIALOG_DATA) public data: Customer,
      public dialog: MatDialog,
      private store: Store) {
      
      this.customerData=data;

      this.formCustomer = new FormGroup({
        FirstName: new FormControl(null, [ Validators.required ]),
        LastName: new FormControl(null, [ Validators.required ]),
        Status: new FormControl(null, [ Validators.required ]),
        Email: new FormControl(null, [ Validators.required, Validators.email]), 
        Phone: new FormControl('')
        });
        
        this.editForm();
    }
    editForm(){
      /*********************************************************/ 
      this.formCustomer.patchValue(this.customerData);  

    }
  save(){
    if(this.formCustomer.valid){
      this.customerData = Object.assign(this.customerData, this.formCustomer.value);      
      this.store.dispatch(addCustomer({ content: this.customerData }));
      this.dialog.closeAll()

    }else{
      this.formCustomer.markAllAsTouched()
    }
   

  }


}
