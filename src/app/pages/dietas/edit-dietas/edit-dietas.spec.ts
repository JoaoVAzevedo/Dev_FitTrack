import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDietas } from './edit-dietas';

describe('EditDietas', () => {
  let component: EditDietas;
  let fixture: ComponentFixture<EditDietas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDietas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDietas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
