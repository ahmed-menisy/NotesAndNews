import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { UserLayoutComponent } from './user-layout/user-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    UserLayoutComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [CommonModule, RouterModule],
})
export class LayoutsModule {}
