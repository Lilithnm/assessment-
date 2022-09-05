import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { TextMaskModule } from 'angular2-text-mask';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { StoreModule } from '@ngrx/store';
import { customerReducer } from './state/customer/customer.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './state/customer/customer.effects';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    TextMaskModule,
    StoreModule.forRoot({ customers: customerReducer }),
    EffectsModule.forRoot([CustomerEffects]),
  ],
  providers: [],
  bootstrap: [CustomerListComponent]
})
export class AppModule { }
