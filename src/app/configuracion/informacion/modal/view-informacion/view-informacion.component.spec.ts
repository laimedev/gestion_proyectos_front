import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInformacionComponent } from './view-informacion.component';

describe('ViewInformacionComponent', () => {
  let component: ViewInformacionComponent;
  let fixture: ComponentFixture<ViewInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInformacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
