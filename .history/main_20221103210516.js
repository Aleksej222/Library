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

Book.prototype.removeFromLibrary = function() {
  console.log("Write function...");
}

function addBookToLibrary() {
  // do stuff here
}

//?? Kako assignat knjigu na addbook,
//?? stavit u array il nesto tako