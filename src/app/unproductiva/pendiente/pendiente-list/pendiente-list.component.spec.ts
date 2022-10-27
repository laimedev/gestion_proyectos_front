import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendienteListComponent } from './pendiente-list.component';

describe('PendienteListComponent', () => {
  let component: PendienteListComponent;
  let fixture: ComponentFixture<PendienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendienteListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
