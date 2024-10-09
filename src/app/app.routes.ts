import { Routes } from '@angular/router';
import { ListagemDeFilmesComponent } from './components/listagem-de-filmes/listagem-de-filmes.component';
import { DetalhamentoDeFilmesComponent } from './components/detalhamento-de-filmes/detalhamento-de-filmes.component';
import { BuscaComponent } from './components/busca/busca.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: ListagemDeFilmesComponent },
  { path: 'filmes/:id', component: DetalhamentoDeFilmesComponent },
  { path: 'busca', component: BuscaComponent },
];
