let myLibrary = [];

function Book(title, author, numOfPages, language) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.language = language;

}

Book.prototype.markAsRead = function() {
  console.log("Write function here...");
}

function addBookToLibrary() {
  // do stuff here
}