import { Component, OnInit, ViewChild,AfterViewInit, Inject, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer } from 'src/app/models/customer.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadCustomers } from '../../state/customer/customer.actions';
import { selectAllCustomers } from '../../state/customer/customer.selectors';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    
    public allCustomers$ = this.store.select(selectAllCustomers); 

    displayedColumns: string[] = ['Id', 'FirstName','LastName' ,'Status', 'Email','Phone'];
    dataSource = new MatTableDataSource<Customer>();

    customer: Customer=new Customer();
    @ViewChild(MatPaginator) paginator?: MatPaginator;

      constructor(public dialog: MatDialog, private store: Store<AppState>) {
        
        this.dataSource = new MatTableDataSource<Customer>();
      }


      ngOnInit() {
        this.store.dispatch(loadCustomers());
      }
      ngAfterViewInit() {
        this.dataSource.paginator = this.paginator ? this.paginator : null;
      }

      edit(customerEdit:Customer){
        const dialogRef = this.dialog.open(CustomerFormComponent, {width: '70vw',maxWidth: '80vw',  data: customerEdit});

      }
      delete(customerDel :Customer){
    
      }
      newCustomer(){
        this.customer=new Customer();
        const dialogRef = this.dialog.open(CustomerFormComponent, {width: '70vw',maxWidth: '80vw' ,  data: this.customer});
          
      }

      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }
}
