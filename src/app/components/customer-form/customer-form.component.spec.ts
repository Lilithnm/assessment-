import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { TextMaskModule } from 'angular2-text-mask';
import { customerReducer } from 'src/app/state/customer/customer.reducer';
import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFormComponent ],
      imports:[ReactiveFormsModule, 
        MatDialogModule,       
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,     
        TextMaskModule,   
       BrowserAnimationsModule,
      StoreModule.forRoot({ customers: customerReducer })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.formCustomer.valid).toBeFalsy();
 });
 
 it('should assign values to edit form', () => {
  component.editForm()
});

 it('should save', () => {
    component.save()
  });


});
