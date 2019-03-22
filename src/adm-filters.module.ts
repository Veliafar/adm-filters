import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18NextModule } from 'angular-i18next';

import { TablePagerComponent } from './components';
import { TableHeaderComponent } from './components';
import { AdmFilterDirectivesModule } from './directives/adm-filter.directive';

@NgModule({
  declarations: [TablePagerComponent, TableHeaderComponent],
  imports     : [CommonModule, I18NextModule, AdmFilterDirectivesModule],
  exports     : [TablePagerComponent, TableHeaderComponent, AdmFilterDirectivesModule],
})

export class AdmFiltersModule {}
