import {Component, Input, ViewChild} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from '../../../../@core/data/order';

@Component({
  templateUrl: './order-form.component.html',
  styleUrls: ['order-form.component.scss'],
})
export class OrderFormComponent {
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
    device: null,
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

  constructor(public windowRef: NbWindowRef) {
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
    } else {
      console.log('Save:', this.order);
    }
  }
}
