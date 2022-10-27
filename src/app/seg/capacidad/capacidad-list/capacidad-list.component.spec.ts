import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacidadListComponent } from './capacidad-list.component';

describe('CapacidadListComponent', () => {
  let component: CapacidadListComponent;
  let fixture: ComponentFixture<CapacidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacidadListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapacidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
