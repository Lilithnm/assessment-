import { Component, OnInit, ViewChild,AfterViewInit, Inject, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer } from 'src/app/models/customer.model';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { loadCustomers, removeCustomer } from '../../state/customer/customer.actions';
import { selectAllCustomers } from '../../state/customer/customer.selectors';
import { AppState } from 'src/app/state/app.state';
import {MatSort, Sort} from '@angular/material/sort';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    customersSubscription?: Subscription;
    public allCustomers$ = this.store.select(selectAllCustomers); 

    displayedColumns: string[] = ['Id', 'FirstName','LastName' ,'Status', 'Email','Phone','Actions'];
    dataSource = new MatTableDataSource<Customer>();

    customer: Customer=new Customer();
    @ViewChild(MatPaginator) paginator?: MatPaginator;      
    @ViewChild(MatSort) sort?: MatSort;

      constructor(public dialog: MatDialog, private store: Store<AppState>) {
        
        this.dataSource = new MatTableDataSource<Customer>();
      }

      ngOnInit() {
        this.store.dispatch(loadCustomers());
        this.customersSubscription = this.allCustomers$
          .pipe(
            map((customerList: Customer[]) => {
                this.dataSource = new MatTableDataSource(customerList);
                this.dataSource.sort = this.sort? this.sort : null;
                this.dataSource.paginator = this.paginator ? this.paginator : null;
                this.dataSource.filterPredicate = (data: Customer, filter:string) => {
                  const textToSearch = data.LastName && data.LastName.toLowerCase() || '';
                  return textToSearch.indexOf(filter) !== -1;
                 };
            })
          )
          .subscribe();
      }

      edit(customerEdit:Customer){
        const dialogRef = this.dialog.open(CustomerFormComponent, {width: '70vw',maxWidth: '80vw',  data: customerEdit});

      }
      delete(customerDel :Customer){
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to delete the customer?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.store.dispatch(removeCustomer({ Id: customerDel.Id?customerDel.Id:''  }));
            Swal.fire(
              'Deleted!',
              'The customer has been deleted.',
              'success'
            )
          }
        })
      }
      newCustomer(){
        this.customer=new Customer();
        const dialogRef = this.dialog.open(CustomerFormComponent, {width: '70vw',maxWidth: '80vw' ,  data: this.customer});
          
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

}
