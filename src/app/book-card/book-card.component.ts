import { Component, Input, OnInit } from '@angular/core';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: any;   //book from book-list component

  constructor() {
  }

  ngOnInit() {
    if(this.book.title.length >= 30){
      this.book.title = this.book.title.substring(0,30)+"..."   //extract first 30 characters of book title to hide lengthy titles
    }
  }

  //format author name
  getName(authorName){  
    let firstName = "";
    let lastName = "";
    if(authorName.split(",")[1]){         // if author has first name and last name
      if(authorName.split(",")[1].split("(")[0]){       //if author name contains '(' or author initials are given
        firstName = authorName.split(",")[1].split("(")[0];  //get initials as first name
        lastName = authorName.split(",")[0];             
      }
      else{                               //if initials not present
        firstName = authorName.split(",")[1]; 
        lastName = authorName.split(",")[0];
      }
      return firstName+" "+lastName;
    }
    else{
      return authorName;   //if name contains only first name
    }
  }


  //open link to book 
  openBook(){
    var key;
    var formats = this.book.formats;
    for(key in this.book.formats){        
      if(!formats[key].endsWith(".zip")){            //if book is not a zip file
        if(key.startsWith('text/html')){             //find if book available in html format
          window.open(formats[key]);
          return;
        }
      }
    }
    for(key in this.book.formats){
      if(!formats[key].endsWith(".zip")){
        if(key.startsWith('application/pdf')){       //if book available in pdf format
          window.open(formats[key]);
          return;
        }
      }
    }
    for(key in this.book.formats){
      if(!formats[key].endsWith(".zip")){
        if(key.startsWith('text/plain')){            //if book available in txt format
          window.open(formats[key]);
          return;
        }
      }
    }
    alert("No readable format available for this book");   //alert if book not available in readable format
    
  }
}