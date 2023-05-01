import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAddEditComponent } from './freelancer-add-edit.component';

describe('FreelancerAddEditComponent', () => {
  let component: FreelancerAddEditComponent;
  let fixture: ComponentFixture<FreelancerAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
