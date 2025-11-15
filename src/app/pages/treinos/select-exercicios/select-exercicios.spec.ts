import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExercicios } from './select-exercicios';

describe('SelectExercicios', () => {
  let component: SelectExercicios;
  let fixture: ComponentFixture<SelectExercicios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExercicios]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectExercicios);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
