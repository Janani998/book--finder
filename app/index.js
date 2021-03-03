/**
 * Application entry point
 */

// Load application styles
import 'scss/_index.scss';

// ================================
// START YOUR APP HERE
// ================================
document.addEventListener("DOMContentLoaded", (event) => {
  
  (function(){
    document.getElementById("keyword").addEventListener("keyup",function(event){
      if(event.keyCode === 13){
        let searchString = document.getElementById("keyword").value
        if(searchString){
          fetchBookList(searchString);
        }
      }
    })
  })();

  function fetchBookList(searchString){
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=35&key=AIzaSyBNuPSeD7l-dTJasBOoSvxpXr8pOM9RAVA`)
      .then(response => response.json())
      .then(data => {
        let bookListHtml = renderBookList(data)
        document.getElementById("book-list").innerHTML = bookListHtml;
      })
      .catch(err => console.log(err))
  }

  function renderBookList(data){

    let bookListHtml = "";
    if(data.items && data.items.length){
      data.items.forEach(book => {
        bookListHtml += `<div class="col-lg-3 col-md-6 col-sm-12 book-display">
            <div class="image">
            <img src="${book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}" alt="book.volumeInfo.title" />
            </div>
            <div>
            <span> Authors: ${book.volumeInfo.authors}</span>
            </div>
            <div class="details">
            <span>Title: ${book.volumeInfo.title}
            </span>
            <a target="_blank" class="previewLink" href="${book.volumeInfo.previewLink}">Preview</a>
            </div>
        </div>`

      });
      
    }
    return bookListHtml; 
  }
})