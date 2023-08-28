//Array to store a list of books
const myLibrary = [];

//Constructor to create instances of book
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}
Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

//Bring up form to add new books
const newBookBtn = document.querySelector('.new-book-btn');
newBookBtn.addEventListener('click', () => {
    createForm();
})

function createForm() {
    const newBookForm = document.querySelector('form');
    //create label for title
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title: ';
    titleLabel.setAttribute('for', 'title');
    newBookForm.append(titleLabel);
    //create input for title
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.id = 'title';
    newBookForm.append(titleInput);
    //create label for author
    const authorLabel = document.createElement('label');
    authorLabel.textContent = 'Author: ';
    authorLabel.setAttribute('for', 'author');
    newBookForm.append(authorLabel);
    //create input for author
    const authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.name = 'author';
    authorInput.id = 'author';
    newBookForm.append(authorInput);
    //create label for page number
    const pagesLabel = document.createElement('label');
    pagesLabel.textContent = 'Pages: ';
    pagesLabel.setAttribute('for', 'pages');
    newBookForm.append(pagesLabel);
    //create input for page number
    const pagesInput = document.createElement('input');
    pagesInput.type = 'number';
    pagesInput.name = 'pages';
    pagesInput.id = 'pages';
    newBookForm.append(pagesInput);
    //create label for "read" status
    const readLabel = document.createElement('label');
    readLabel.textContent = 'Read: ';
    readLabel.setAttribute('for', 'read');
    newBookForm.append(readLabel);
    //create input for "read" status
    const readInput = document.createElement('input');
    readInput.type = 'text';
    readInput.name = 'read';
    readInput.id = 'read';
    newBookForm.append(readInput);
    //create submit button
    const submitBookBtn = document.createElement('button');
    submitBookBtn.type = 'submit';
    submitBookBtn.textContent = 'Submit';
    newBookForm.append(submitBookBtn);
    //submit button will add book to myLibrary
    submitBookBtn.addEventListener('click', () => {
        //create new book with data provided
        let book = new Book(
            document.getElementById('title').value,
            document.getElementById('author').value,
            document.getElementById('pages').value,
            document.getElementById('read').value
        )
        //then add the book to myLibrary
        myLibrary.push(book);
    })
}