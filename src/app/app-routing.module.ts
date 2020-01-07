import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GenreListComponent} from './genre-list/genre-list.component';
import {BookListComponent} from './book-list/book-list.component';


const routes: Routes = [
  {path: 'genre' , component: GenreListComponent},
  {path: 'books/:genre' , component: BookListComponent},
  {path:'**', component: GenreListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
