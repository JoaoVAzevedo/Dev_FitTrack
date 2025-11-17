import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDieta } from './cadastro-dieta';

describe('CadastroDieta', () => {
  let component: CadastroDieta;
  let fixture: ComponentFixture<CadastroDieta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroDieta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDieta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
