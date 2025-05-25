import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaRuletaComponent } from './partida-ruleta.component';

describe('PartidaRuletaComponent', () => {
  let component: PartidaRuletaComponent;
  let fixture: ComponentFixture<PartidaRuletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidaRuletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaRuletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
