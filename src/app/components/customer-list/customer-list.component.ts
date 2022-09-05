import { Component, OnInit, ViewChild,AfterViewInit, Inject, Optional } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { Customer } from 'src/app/models/customer.model';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { loadCustomers } from '../../state/customer/customer.actions';
import { selectAllCustomers } from '../../state/customer/customer.selectors';
import { AppState } from 'src/app/state/app.state';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

    customersSubscription?: Subscription;
    public allCustomers$ = this.store.select(selectAllCustomers); 

    displayedColumns: string[] = ['Id', 'FirstName','LastName' ,'Status', 'Email','Phone'];
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
                
                console.log(this.dataSource)
                console.log(this.dataSource.sort)
            })
          )
          .subscribe();
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

      announceSortChange(sortState: Sort) {
        // This example uses English messages. If your application supports
        // multiple language, you would internationalize these strings.
        // Furthermore, you can customize the message to add additional
        // details about the values being sorted.
       console.log(sortState)
      }
}
