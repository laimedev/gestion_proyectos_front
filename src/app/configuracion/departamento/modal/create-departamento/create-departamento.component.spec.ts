import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartamentoComponent } from './create-departamento.component';

describe('CreateDepartamentoComponent', () => {
  let component: CreateDepartamentoComponent;
  let fixture: ComponentFixture<CreateDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
