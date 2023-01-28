import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredComponent } from './pred.component';

describe('PredComponent', () => {
  let component: PredComponent;
  let fixture: ComponentFixture<PredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
