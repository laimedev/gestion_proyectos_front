import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTrabajoComponent } from './delete-trabajo.component';

describe('DeleteTrabajoComponent', () => {
  let component: DeleteTrabajoComponent;
  let fixture: ComponentFixture<DeleteTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTrabajoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
