import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDepartamentoComponent } from './delete-departamento.component';

describe('DeleteDepartamentoComponent', () => {
  let component: DeleteDepartamentoComponent;
  let fixture: ComponentFixture<DeleteDepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDepartamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
