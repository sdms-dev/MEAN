import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {WeatherInfoComponent} from './weather-info.component';
import { WeatherInfoListComponent } from './weather-info-list/weather-info-list.component';

const Routes: Route[] = [
  {
      path     : '',
      component: WeatherInfoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(Routes),
    CommonModule,
  ],
  declarations: [
    WeatherInfoComponent,
    WeatherInfoListComponent
  ]
})
export class WeatherInfoModule { }
