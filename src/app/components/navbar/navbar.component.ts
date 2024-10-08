import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListagemDeFilmesComponent } from '../listagem-de-filmes/listagem-de-filmes.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, RouterLink, ListagemDeFilmesComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'], // corrigido para styleUrls no plural
})
export class NavbarComponent {

  public colapsarNavbar: boolean;

  constructor() {
    this.colapsarNavbar = false;
  }

}
