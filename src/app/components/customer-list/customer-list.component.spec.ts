import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule  } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { customerReducer } from 'src/app/state/customer/customer.reducer';
import { CustomerListComponent } from './customer-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/state/app.state';
import { ReactiveFormsModule } from '@angular/forms';
import { Customer } from 'src/app/models/customer.model';
describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let customerTest: Customer = new Customer();
  let store: MockStore<{ loggedIn: boolean }>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerListComponent ],
      imports:[MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCardModule,         
      BrowserAnimationsModule,ReactiveFormsModule, 
      StoreModule.forRoot({ customers: customerReducer }) ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  
  it('gets Customer Data', () => {
    component.getCustomerData()
    component.allCustomers$.subscribe((asyncData)=>{
      expect(asyncData).toBeDefined();
      })
    });
    
    it('opens Customer Data Form Dialog', () => {
      component.newCustomer()   
  });

  it('opens edit customer Form Dialog', () => {
    component.edit(customerTest)   
  });
  it('opens delete confirm', () => {
    component.delete(customerTest)   
  });
});
