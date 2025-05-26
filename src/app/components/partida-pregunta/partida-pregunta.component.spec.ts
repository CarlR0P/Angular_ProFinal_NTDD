import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaPreguntaComponent } from './partida-pregunta.component';

describe('PartidaPreguntaComponent', () => {
  let component: PartidaPreguntaComponent;
  let fixture: ComponentFixture<PartidaPreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartidaPreguntaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaPreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});