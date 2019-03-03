import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FilterConditionsComponent } from './filter-conditions/filter-conditions.component';
import { QueryBuilderComponent } from './shared/components/query-builder/query-builder.component';
import { DataControlsComponent } from './shared/components/data-controls/data-controls.component';
import { TooltipModule,DropdownModule,MultiSelectModule} from 'primeng/primeng';
@NgModule({
  declarations: [
    AppComponent,
    QueryBuilderComponent,
    FilterConditionsComponent,
    DataControlsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    TooltipModule,
    DropdownModule,
    MultiSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
