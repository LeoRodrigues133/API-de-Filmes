import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ListagemDeFilmesComponent } from './components/listagem-de-filmes/listagem-de-filmes.component';
import { DetalhamentoDeFilmesComponent } from './components/detalhamento-de-filmes/detalhamento-de-filmes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListagemDeFilmesComponent },
  { path: 'filme/:id', component: DetalhamentoDeFilmesComponent },
  { path: 'busca', component:  SearchComponent},
];
