import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoareaListComponent } from './tipoarea-list.component';

describe('TipoareaListComponent', () => {
  let component: TipoareaListComponent;
  let fixture: ComponentFixture<TipoareaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoareaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoareaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
