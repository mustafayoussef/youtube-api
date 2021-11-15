import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RatingComponent } from './components/rating/rating.component';

@NgModule({
  declarations: [HeaderComponent, RatingComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
  exports: [HeaderComponent]
})
export class CoreModule { }
