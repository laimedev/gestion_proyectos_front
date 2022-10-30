import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInformacionComponent } from './create-informacion.component';

describe('CreateInformacionComponent', () => {
  let component: CreateInformacionComponent;
  let fixture: ComponentFixture<CreateInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
