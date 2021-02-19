import {Component, Input, ViewChild} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../../../../@core/data/order';
import {ApiService} from '../../../../@core/data/api.service';
import {environment} from '../../../../../environments/environment';

@Component({
  templateUrl: './order-form.component.html',
  styleUrls: ['order-form.component.scss'],
})
export class OrderFormComponent {
  baseUrl = environment.REST_API_URL;
  options: string[];
  filteredOptions$: Observable<string[]>;
  order: Order = {
    id: null,
    client: {
      name: null,
      phone: null,
      email: null
    },
    defect: null,
    device: 'PHONE',
    deviceId: null,
    equipment: null,
    estimatedCost: null,
    finalCost: null,
    isExpress: false,
    model: null,
    performWork: null,
    realCost: null,
    receiptDate: new Date(),
    returnDate: null,
    status: 'INCOMING'
  };

  @ViewChild('nameInput') input;

  constructor(public windowRef: NbWindowRef, private apiService: ApiService) {
    this.options = ['Mykola Bohdan', 'Roman Palamarchuk', 'Testowy Client'];
    this.filteredOptions$ = of(this.options);
    // @ts-ignore
    console.log('initialData:', this.windowRef.config.context.initialData);
    // @ts-ignore
    if (this.windowRef.config.context.initialData) {
      // @ts-ignore
      this.order = this.windowRef.config.context.initialData;
    }
  }

  refreshOrders(){
    // @ts-ignore
    if (this.windowRef.config.context.refresh) {
      // @ts-ignore
      this.windowRef.config.context.refresh.next('need to refresh orders');
    }
  }

  close() {
    this.windowRef.close();
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  findClient() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onNameChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  saveOrder() {
    if (this.order.id) {
      console.log('Update:', this.order);
      this.apiService.put(this.baseUrl + '/orders', this.order)
        .subscribe((res: Order) => {
          console.log('Res [put] /orders: ', res);
          this.refreshOrders();
          this.windowRef.close();
        });
    } else {
      console.log('Save:', this.order);
      this.apiService.post(this.baseUrl + '/orders', this.order)
        .subscribe((res: Order) => {
          console.log('Res [post] /orders: ', res);
          this.refreshOrders();
          this.windowRef.close();
        });
    }
  }
}
