import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterConditionsComponent } from './filter-conditions.component';

describe('FilterConditionsComponent', () => {
  let component: FilterConditionsComponent;
  let fixture: ComponentFixture<FilterConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
