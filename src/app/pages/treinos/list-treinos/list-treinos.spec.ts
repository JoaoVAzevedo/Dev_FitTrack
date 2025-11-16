import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreinos } from './list-treinos';

describe('ListTreinos', () => {
  let component: ListTreinos;
  let fixture: ComponentFixture<ListTreinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTreinos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTreinos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
