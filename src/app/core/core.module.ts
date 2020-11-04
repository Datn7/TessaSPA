import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [NavBarComponent, ContactComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavBarComponent, ContactComponent],
})
export class CoreModule {}
