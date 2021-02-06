import {NgModule} from '@angular/core';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbPopoverModule, NbSelectModule} from '@nebular/theme';

import {ThemeModule} from '../../@theme/theme.module';
import {OrdersRoutingModule, routedComponents} from './orders-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    OrdersRoutingModule,
    NgxDatatableModule,
    NbPopoverModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    FormsModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class OrdersModule { }
