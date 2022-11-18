import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('#pratics').particleground({
      dotColor: '',
      density: 5000,
      lineColor: 'rgb(60, 63, 67)',
    });
  }
}
