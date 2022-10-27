import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionListComponent } from './instruction-list.component';

describe('InstructionListComponent', () => {
  let component: InstructionListComponent;
  let fixture: ComponentFixture<InstructionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
