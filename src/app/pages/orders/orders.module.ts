import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule,
  NbDialogModule, NbIconModule,
  NbInputModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';

// modules
import { ThemeModule } from '../../@theme/theme.module';
import {OrdersRoutingModule, routedComponents} from './orders-routing.module';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ShowcaseDialogComponent} from '../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import {DialogNamePromptComponent} from '../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import {WindowFormComponent} from '../modal-overlays/window/window-form/window-form.component';
import {
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent
} from '../modal-overlays/popovers/popover-examples.component';

const ENTRY_COMPONENTS = [
  ShowcaseDialogComponent,
  DialogNamePromptComponent,
  WindowFormComponent,
  NgxPopoverCardComponent,
  NgxPopoverFormComponent,
  NgxPopoverTabsComponent,
];

const MODULES = [
  FormsModule,
  ThemeModule,
  OrdersRoutingModule,
  NbDialogModule.forChild(),
  NbWindowModule.forChild(),
  NbIconModule,
  NgxDatatableModule,
  NbCardModule,
  NbCheckboxModule,
  NbTabsetModule,
  NbPopoverModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbTooltipModule,
  NbAutocompleteModule,
  NbAccordionModule,
  NbDatepickerModule
];

@NgModule({
  imports: [
    ...MODULES,
  ],
  declarations: [
    ...routedComponents,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS,
  ],
})
export class OrdersModule { }
