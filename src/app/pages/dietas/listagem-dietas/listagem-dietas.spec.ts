import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemDietas } from './listagem-dietas';

describe('ListagemDietas', () => {
  let component: ListagemDietas;
  let fixture: ComponentFixture<ListagemDietas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemDietas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemDietas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
