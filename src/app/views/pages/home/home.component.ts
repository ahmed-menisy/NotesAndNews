import { Component, OnInit } from '@angular/core';

declare const $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $('#pratics').particleground({
      dotColor: '',
      density: 5000,
      lineColor: 'rgb(60, 63, 67)',
    });
  }
}
