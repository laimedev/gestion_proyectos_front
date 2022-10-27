import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadListComponent } from './calidad-list.component';

describe('CalidadListComponent', () => {
  let component: CalidadListComponent;
  let fixture: ComponentFixture<CalidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
