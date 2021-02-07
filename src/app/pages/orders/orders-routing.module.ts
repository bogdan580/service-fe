import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OrdersComponent} from './orders.component';
import {OrdersTableComponent} from './orders-table/orders-table.component';
import {OrderFormComponent} from './orders-table/order-form/order-form.component';

const routes: Routes = [{
  path: '',
  component: OrdersComponent,
  children: [
    {
      path: 'table',
      component: OrdersTableComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule { }

export const routedComponents = [
  OrdersComponent,
  OrdersTableComponent,
  OrderFormComponent
];
