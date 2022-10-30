import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDepartamentoComponent } from './view-departamento.component';

describe('ViewDepartamentoComponent', () => {
  let component: ViewDepartamentoComponent;
  let fixture: ComponentFixture<ViewDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
