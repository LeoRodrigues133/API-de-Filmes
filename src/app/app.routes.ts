import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { DetalhamentoDeFilmesComponent } from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MovieListComponent },
  { path: 'filme/:id', component: DetalhamentoDeFilmesComponent },
  { path: 'busca', component:  SearchComponent},
];
