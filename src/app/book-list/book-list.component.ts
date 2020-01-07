import { Component, OnInit, HostListener } from '@angular/core';
import {BookServiceService} from './book-service.service';
import {ActivatedRoute} from '@angular/router';

import { Books } from './books';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  scrollDetermine: Number = 1; 
  searchQuery:string = "";      //input search for book filter
  books:any = [];             
  result:Books;
  genre: String = "";
  prevSearch:string="";

  private baseUrl: String="http://skunkworks.ignitesol.com:8000/books?";
  private bookUrl: String="";   //modify this url with query parameters

  constructor(private bookService: BookServiceService, private route: ActivatedRoute) { 
    this.route.params.subscribe( 
      params => {
        this.genre = params.genre;
        this.bookUrl = this.baseUrl+`topic=${this.genre}`+`&mime_type=image%2f`;  //get genre and modify bookUrl
      } 
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
  if ((Math.round((window.innerHeight+window.scrollY)/document.body.offsetHeight))>this.scrollDetermine) {   //determines if user has scrolled to window length

    this.scrollDetermine = Math.round((window.innerHeight+window.scrollY)/document.body.offsetHeight);
    if(this.result.next){
      this.bookUrl = this.result.next;      //fetch the next url from result data
      this.fetchBooks();            
    }
  }
}

  ngOnInit() {
    this.fetchBooks();
  }


  // call service method to get books
  fetchBooks(){
    this.bookService.getBooks(this.bookUrl).subscribe(
      result => {
        this.result = result; 
        this.books = this.books.concat(result.results); 
      });
  }


  //filter books on input search
  filterBooks(){
    if(this.searchQuery!=""){
      clearTimeout(timeout);

      var self = this;

      //timeout to wait after user enters in input
      var timeout = setTimeout(function(){
        if(self.prevSearch!=self.searchQuery){  //if prev input search same as next do not call api
          self.prevSearch = self.searchQuery;
          let encodedSearchTerm = encodeURIComponent(self.searchQuery); //encode search term
          self.bookUrl = self.baseUrl+`topic=${self.genre}`+`&mime_type=image%2f`+`&search=${encodedSearchTerm}`;
          self.books=[];
          self.fetchBooks();
        }
      },500);
    }
    else{
      this.bookUrl = this.bookUrl = this.baseUrl+`topic=${this.genre}`+`&mime_type=image%2f`;
      this.fetchBooks();
    }
  }

// clear input and use original url for fetching result
  clearInput(){
    this.searchQuery="";
    this.prevSearch="";
    this.bookUrl=this.baseUrl+`topic=${this.genre}`+`&mime_type=image%2f`;
    this.books=[];
    this.fetchBooks();
  }


}