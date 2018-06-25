import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DdVirtualizedModule } from 'dd-virtualized';

import { ComponentsModule } from '../components/components.module';

import { OverviewPageComponent } from './overview-page/overview-page.component';
import { SearchCourceFormComponent } from './overview-page/search-cource-form/search-cource-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    DdVirtualizedModule
  ],
  declarations: [
    OverviewPageComponent,
    SearchCourceFormComponent
  ],
  exports: [OverviewPageComponent]
})
export class PagesModule { }
