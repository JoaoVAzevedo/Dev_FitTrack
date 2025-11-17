import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTreinos } from './edit-treinos';

describe('EditTreinos', () => {
  let component: EditTreinos;
  let fixture: ComponentFixture<EditTreinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTreinos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTreinos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
