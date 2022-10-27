import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUbigeoComponent } from './info-ubigeo.component';

describe('InfoUbigeoComponent', () => {
  let component: InfoUbigeoComponent;
  let fixture: ComponentFixture<InfoUbigeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoUbigeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoUbigeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
