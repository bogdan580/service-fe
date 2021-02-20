import {Component, OnInit, ViewChild} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {Observable} from 'rxjs';
import {Client, Order} from '../../../../@core/data/order';
import {ApiService} from '../../../../@core/data/api.service';
import {environment} from '../../../../../environments/environment';
import {map} from 'rxjs/operators';

@Component({
  templateUrl: './order-form.component.html',
  styleUrls: ['order-form.component.scss'],
})
export class OrderFormComponent {
  baseUrl = environment.REST_API_URL;
  clients: Client[];
  filteredOptions$: Observable<Client[]>;
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

  constructor(public windowRef: NbWindowRef, private apiService: ApiService) {
    // @ts-ignore
    console.log('initialData:', this.windowRef.config.context.initialData);
    // @ts-ignore
    if (this.windowRef.config.context.initialData) {
      // @ts-ignore
      this.order = this.windowRef.config.context.initialData;
    }
  }

  refreshOrders() {
    // @ts-ignore
    if (this.windowRef.config.context.refresh) {
      // @ts-ignore
      this.windowRef.config.context.refresh.next('Orders need to refresh...');
    }
  }

  close() {
    this.windowRef.close();
  }

  /*  options: string[];
      filteredOptions$: Observable<string[]>;

      tmpConstructor() {
       this.options = ['Mykola Bohdan', 'Roman Palamarchuk', 'Testowy Client'];
       this.filteredOptions$ = of(this.options);
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

    findBy(){
      this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
    }*/

  findClientByName(event: Event) {
    this.filteredOptions$ = this.apiService.post(this.baseUrl + '/orders/findClient',
      {
        name: (event.target as HTMLInputElement).value,
        phone: this.order.client.phone,
        email: this.order.client.email
      }).pipe(map(clients => this.clients = clients));
  }

  findClientByPhone(event: Event) {
    this.filteredOptions$ = this.apiService.post(this.baseUrl + '/orders/findClient',
      {
        name: this.order.client.name,
        phone: (event.target as HTMLInputElement).value,
        email: this.order.client.email
      }).pipe(map(clients => this.clients = clients));
  }

  findClientByEmail(event: Event) {
    this.filteredOptions$ = this.apiService.post(this.baseUrl + '/orders/findClient',
      {
        name: this.order.client.name,
        phone: this.order.client.phone,
        email: (event.target as HTMLInputElement).value
      }).pipe(map(clients => this.clients = clients));
  }

  onNameChange(name) {
    const foundClients = this.clients.filter(cl => cl.name === name);
    if (foundClients.length === 1) {
      this.order.client = foundClients[0];
    }
  }

  onPhoneChange(phone) {
    const foundClients = this.clients.filter(cl => cl.phone === phone);
    if (foundClients.length === 1) {
      this.order.client = foundClients[0];
    }
  }

  onEmailChange(email) {
    const foundClients = this.clients.filter(cl => cl.email === email);
    if (foundClients.length === 1) {
      this.order.client = foundClients[0];
    }
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
