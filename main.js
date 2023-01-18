let myLibrary = [];
const booksContainer = document.querySelector('.container-books');

const addNewBookBtn = document.querySelector('.btn-add-book');
const modalWindow = document.querySelector('.modal');
const closeAddNewBook = document.querySelector('.close');
const bookForm = document.querySelector('#book-info-form');

function Book(title, author, numOfPages, language, read) {

  // the constructor...
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.language = language;
  this.read = read;

}

// !! Testiranje, probat napravit prototype funkcije na poziv druge funkcije
// TODO: Na mark as read treba promjenit boju
Book.prototype.markAsRead = function() {

  // console.log(this);
  this.read = !this.read;

}

Book.prototype.removeFromLibrary = function() {
  
  // console.log(this);
  myLibrary.splice(this.id, 1);

}

// ** Function for displaying books (copied code from CatQueenCodes/Project-Library)
function render() {

  let books = document.querySelectorAll('.book');
  books.forEach(book => {
    booksContainer.removeChild(book);
  });
  
  for (let i = 0; i < myLibrary.length; i++) {

    createBookHTML(myLibrary[i]);

  }

}

// Create book in DOM
function addBookToLibrary(book) {
  
  myLibrary.push(book);
  render();
 
}

// ** Create book HTML
function createBookHTML(book) {

  // console.log(book);

  // Create book in HTML
  let bookHtml = document.createElement('div');
  bookHtml.classList.add('book');
  bookHtml.setAttribute('id', myLibrary.indexOf(book));
  book.id = bookHtml.id;

  bookHtml.innerHTML = `
  
      <div class="book-remove">
        <span class="btn-remove-book">&#x2715</span>     
      </div>

      <div class="book-information">
          <p class="book-title">${book.title}</p>
          <p>By: ${book.author}</p>
          <p>Number of Pages: ${book.numOfPages}</p>
          <p>Language: ${book.language}</p>
      </div>

      <div class="book-buttons">
          <div class="btn-remove-book">
              <i class="fa fa-trash-o"></i>
          </div>

          <div class="mark-read">
              <span class="mark-read-text">Mark as read:</span>
              <div class="mark-read-btn">
                  <label class="switch">
                      <input id="mark-as-read" type="checkbox">
                      <span class="slider round"></span>
                  </label>
              </div>
          </div>

      </div>
  
    `

  let bookReadCheck = bookHtml.querySelector('#mark-as-read');
  
  bookReadCheck.checked = book.read;

  booksContainer.appendChild(bookHtml);

  let removeBookBtns = bookHtml.querySelectorAll('.btn-remove-book');

  removeBookBtns.forEach(btn => {
    
    btn.addEventListener('click', function() {
      
      book.removeFromLibrary();
      render();

    });

  })

  bookReadCheck.addEventListener('change', function() {

    book.markAsRead();

  })

}

// ** Create book on submit click
bookForm.addEventListener('submit', function (e) {

  e.preventDefault();

  // !! Vratit na true
  //if (validateForm(bookForm) === true)
  if (validateForm(bookForm) === false) {

    //console.log(bookForm);

    let formFields = bookForm.querySelectorAll("[data-form-field]");
    let book = new Book();

    formFields.forEach(field => {

      let fieldValue = field.value;
      let fieldName = field.name;

      if (fieldName == 'read') {

        if (fieldValue == 'true') {
          book[fieldName] = true;

        } else {
          book[fieldName] = false;
        }

      } else {
        book[fieldName] = fieldValue;
      }

    });

    addBookToLibrary(book);

  }

});

// ** Check if form data is valid (Currently disabled for testing)
function validateForm(formData) {

  let inputFields = formData.querySelectorAll('input[type=text]');
  let pagesField = formData.querySelector('input[type=number]');
  let readValue = formData.querySelector('select');

  // Check input type text fields
  inputFields.forEach(field => {

    let fieldValue = field.value;
    let errorField = field.parentNode.querySelector('.error-message');

    if (fieldValue.length < 3) {

      errorField.style.display = 'block';

    } else {

      errorField.style.display = 'none';

    }

  });

  // Check nuber of pages
  let errorFieldPages = pagesField.parentNode.querySelector('.error-message');
  if (pagesField.value > 0) {

    errorFieldPages.style.display = 'none';

  } else {

    errorFieldPages.style.display = 'block';

  }

  // Check dropdown value
  let errorFieldRead = readValue.parentNode.querySelector('.error-message');
  if (readValue.value === '') {

    errorFieldRead.style.display = 'block';

  } else {

    errorFieldRead.style.display = 'none';

  }


  // Check if form has errors, then return true or false
  let errorMessage = modalWindow.querySelectorAll('.error-message[style*="display: block"]');
  let formIsValid = (errorMessage.length == 0);

  if (formIsValid) {
    return true;

  } else {
    return false;
  }

}

// ** On add new book button click:
addNewBookBtn.addEventListener('click', function () {

  modalWindow.style.display = 'block';

});

// ** Functions for closing the modal window
closeAddNewBook.addEventListener('click', function () {

  modalWindow.style.display = 'none';

});

// !! Probat dodat onmouseup/down, i malo neke izmjene (zbog buga)
window.addEventListener('click', function (e) {

  let containerModal = modalWindow.querySelector('.container-modal');
  let closeModalBool = false;

  closeModalBool = (modalWindow.style.display == 'block');
  closeModalBool = closeModalBool && (e.target !== addNewBookBtn);
  closeModalBool = closeModalBool && (!containerModal.contains(e.target));

  if (closeModalBool) {
    modalWindow.style.display = 'none';
  }

});


// ?? Delete book on x click and on icon click
// ?? Change color of book when marked as read
// ?? Close the modal window (look how others did it)
// ** Show errors when invalid input, adjust modal window height
// ?? Display new book
// ?? Do proper form validation
// ?? Do something with login button
// ?? Add character limit (prevent too long names)
// ?? Clear form values after submiting a book

// !! Aktivni bugovi:
// TODO: Bug: kad se brise tekst sa polja i mis je izvan containera forma nestane
// TODO: Bug: kad se klikne sa forme vrednosti polja ostanu (treba bit prazno kad se ponovo otvori)
// TODO: Change: kasnije zamjenit invalid sa praznim, i napravit da true false bude bool, a ne string

// ** Popravljeno:
// Bug: page height, kad se doda puno knjiga, kad se skrola prema dnu pozadina je bijela
// Bug: button za dodavanje knjige ostane na sredini stranice kad se moze skrolat prema dole
// Bug: kad se doda knjiga read stanje se vrati na originalno (ne sacuva sta je stavljeno kasnije)
// Bug: kad se doda knjiga ako se read value stavi na true, slider nije pomjeren na true