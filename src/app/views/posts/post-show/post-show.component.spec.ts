/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostShowComponent } from './post-show.component';

describe('PostShowComponent', () => {
  let component: PostShowComponent;
  let fixture: ComponentFixture<PostShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
