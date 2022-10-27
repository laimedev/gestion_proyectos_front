import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGenderComponent } from './info-gender.component';

describe('InfoGenderComponent', () => {
  let component: InfoGenderComponent;
  let fixture: ComponentFixture<InfoGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
