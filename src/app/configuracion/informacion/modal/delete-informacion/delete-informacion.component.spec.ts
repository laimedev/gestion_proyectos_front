import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInformacionComponent } from './delete-informacion.component';

describe('DeleteInformacionComponent', () => {
  let component: DeleteInformacionComponent;
  let fixture: ComponentFixture<DeleteInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
