import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent implements OnInit {

  genre_list = ["Fiction","Drama","Humour","Politics","Philosophy","History","Adventure"];
  

  constructor() { }

  ngOnInit() {
  }

}
