import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addCustomer, loadCustomers, loadCustomersSuccess, loadCustomersFailure} from './customer.actions';
import { CustomerService } from 'src/app/services/customer.service'; 
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAllCustomers } from './customer.selectors';
import { AppState } from '../app.state';

@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private customerService: CustomerService
  ) {}

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomers),
      switchMap(() =>
        from(this.customerService.getCustomers()).pipe(
          map((customers) => loadCustomersSuccess({ customers: customers })),
          catchError((error) => of(loadCustomersFailure({ error })))
        )
      )
    )
  );

  saveCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomer),
        withLatestFrom(this.store.select(selectAllCustomers)),
        switchMap(([action, customers]) => from(this.customerService.saveCustomers(customers)))
      ),
    { dispatch: false }
  );


}

