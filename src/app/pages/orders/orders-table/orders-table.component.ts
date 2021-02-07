import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApiService, Page} from '../../../@core/data/api.service';
import {environment} from '../../../../environments/environment';
import {ColumnMode, SelectionType} from '@swimlane/ngx-datatable';
import {NbWindowRef, NbWindowService} from '@nebular/theme';
import {OrderFormComponent} from './order-form/order-form.component';
import {Order} from '../../../@core/data/order';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent {

  @ViewChild('orderTable') table: any;
  baseUrl = environment.REST_API_URL;

  selected = [];
  lastSelectId: number;

  page = new Page();
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  loadingIndicator = true;
  allColumns = [
    {prop: 'id', name: 'ID'},
    {prop: 'client.name', name: 'Клієнт'},
    {prop: 'client.phone', name: 'Телефон'},
    {prop: 'device', name: 'Тип пристрою'},
    {prop: 'model', name: 'Модель'},
    {prop: 'deviceId', name: 'IMEI'},
    {prop: 'status', name: 'Статус'},
    {prop: 'isExpress', name: 'Терміновий'},

    {prop: 'defect', name: 'Несправність'},
    {prop: 'receiptDate', name: 'Дата прийому'},
    {prop: 'estimatedCost', name: 'Орієнтовна вартість'},
    {prop: 'returnDate', name: 'Дата повернення'},
    {prop: 'equipment', name: 'Комплектація'},
    {prop: 'realCost', name: 'Собівартість'},
    {prop: 'finalCost', name: 'Ціна для клієнта'},
    {prop: 'performWork', name: 'Виконана робота'},
    {prop: 'client.email', name: 'Email'},
  ];
  columns = [
    {prop: 'id', name: 'ID'},
    {prop: 'client.name', name: 'Клієнт'},
    {prop: 'client.phone', name: 'Телефон'},
    {prop: 'device', name: 'Тип пристрою'},
    {prop: 'model', name: 'Модель'},
    {prop: 'deviceId', name: 'IMEI'},
    {prop: 'status', name: 'Статус'},
    {prop: 'isExpress', name: 'Терміновий'},
  ];
  rows: Order[];

  constructor(private apiService: ApiService, private windowService: NbWindowService) {
    this.page.number = 0;
    this.page.size = 10;

    this.setPage({offset: 0});
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  setPage(pageInfo): void {
    console.log('Table page ', pageInfo);
    this.page.number = pageInfo.offset;
    this.loadingIndicator = true;
    this.apiService.get(this.baseUrl + '/orders?page=' + this.page.number + '&size=' + this.page.size)
      .subscribe((res: Page) => {
        console.log(res);
        this.page = res;
        this.rows = res.content;
        setTimeout(() => {
          this.loadingIndicator = false;
        }, 500);
      });
  }

  sortPage(sortInfo) {
    console.log('todo implement srt request', sortInfo);
  }

  toggle(col) {
    const isChecked = this.isChecked(col);

    if (isChecked) {
      this.columns = this.columns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns, col];
    }
  }

  isChecked(col) {
    return (
      this.columns.find(c => {
        return c.name === col.name;
      }) !== undefined
    );
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  openNewForm() {
    this.windowService.open(OrderFormComponent, {title: `Нове замовлення`, windowClass: 'form-order'});
  }

  openEditForm() {
    this.windowService.open(OrderFormComponent,
      {title: `Редагуй замовлення #` + this.selected[0].id, windowClass: 'form-order', context: {initialData: this.selected[0]}});
  }

  onSelect({selected}) {
    if (this.lastSelectId === selected[0].id) {
      this.selected = [];
      this.lastSelectId = null;
    } else {
      this.lastSelectId = selected[0].id;
    }
  }

  filterClient(event: any) {
    console.log('Client', event);
  }

  filterPhone(event: any) {
    console.log('Tel', event);
  }
}
