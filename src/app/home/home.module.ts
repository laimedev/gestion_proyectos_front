import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { GreetingPipe } from './pipes/greeting.pipe';
import { TodayPipe } from './pipes/today.pipe';


@NgModule({
  declarations: [HomeComponent, GreetingPipe, TodayPipe],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
