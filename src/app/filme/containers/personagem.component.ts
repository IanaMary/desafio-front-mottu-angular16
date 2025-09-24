import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../services/filme.service';

@Component({
  selector: 'app-personagem',
  templateUrl: './personagem.component.html',
  styleUrls: ['./personagem.component.scss']
})
export class PersonagemComponent implements OnInit {

  pagAtual = [true, false];


  ngOnInit() { }


}
