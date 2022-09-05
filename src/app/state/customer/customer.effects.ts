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

  // Run this code when a loadCustomers action is dispatched
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCustomers),
      switchMap(() =>
        // Call the getCustomers method, convert it to an observable
        from(this.customerService.getCustomers()).pipe(
          // Take the returned value and return a new success action containing the customers
          map((customers) => loadCustomersSuccess({ customers: customers })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadCustomersFailure({ error })))
        )
      )
    )
  );

  // Run this code when the addCustomer or removeCustomer action is dispatched
  saveCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCustomer),
        withLatestFrom(this.store.select(selectAllCustomers)),
        switchMap(([action, customers]) => from(this.customerService.saveCustomers(customers)))
      ),
    // Most effects dispatch another action, but this one is just a "fire and forget" effect
    { dispatch: false }
  );
}
