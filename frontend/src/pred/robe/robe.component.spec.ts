import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobeComponent } from './robe.component';

describe('RobeComponent', () => {
  let component: RobeComponent;
  let fixture: ComponentFixture<RobeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
