import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTareaComponent } from './delete-tarea.component';

describe('DeleteTareaComponent', () => {
  let component: DeleteTareaComponent;
  let fixture: ComponentFixture<DeleteTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
