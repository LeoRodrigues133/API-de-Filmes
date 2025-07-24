import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { ListagemDeFilme } from '../../../models/Listagem-de-Filme';
import { RateIconComponent } from '../rate-icon/rate-icon.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RateIconComponent, NgIf, RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class CardDeFilmesComponent {
  @Input ({required: true}) filme!: ListagemDeFilme;

}
