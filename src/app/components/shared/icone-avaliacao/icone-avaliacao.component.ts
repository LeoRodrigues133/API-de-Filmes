import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListagemDeFilme } from '../../../models/listagem-de-filmes';

@Component({
  selector: 'app-icone-avaliacao',
  standalone: true,
  imports: [NgClass],
  templateUrl: './icone-avaliacao.component.html',
  styleUrl: './icone-avaliacao.component.scss'
})
export class IconeAvaliacaoComponent {
@Input ({required: true}) avaliacao:number;
@Input ({required: false}) tamanho:number;


  constructor() {
    this.avaliacao = 0;
    this.tamanho= 30;
  }

    public mapearCorDaNota(avaliacao: number): string {
    if (avaliacao > 0 && avaliacao <= 30) return 'app-borda-nota-mais-baixa';
    else if (avaliacao > 30 && avaliacao <= 50) return 'app-borda-nota-baixa';
    else if (avaliacao > 50 && avaliacao <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }
}
