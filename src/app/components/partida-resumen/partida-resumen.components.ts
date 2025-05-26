import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface RespuestaUsuario {
  preguntaId: string;
  preguntaTexto: string;
  respuestaUsuario: string;
  respuestaCorrecta: string;
  correcta: boolean;
}
@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  partidas: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  respuestasUsuario: RespuestaUsuario[] = [];
correctas: number = 0;
incorrectas: number = 0;
  ngOnInit(): void {
  const respuestasJson = localStorage.getItem('respuestasUsuario');
  if (respuestasJson) {
    this.respuestasUsuario = JSON.parse(respuestasJson);
    this.correctas = this.respuestasUsuario.filter(r => r.correcta).length;
    this.incorrectas = this.respuestasUsuario.length - this.correctas;
  }
}  



}