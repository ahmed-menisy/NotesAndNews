import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}

  logOut(): void {
    this._AuthService.logOut();
  }
}
