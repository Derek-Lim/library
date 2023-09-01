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

//Display books
const showBookBtn = document.querySelector('.show-book-btn');
showBookBtn.addEventListener('click', () => {
    displayBooks();
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

    //create dropdown for "read" status
    const readDropdown = document.createElement('select');
    newBookForm.append(readDropdown);
    //create "read" option for readDropdown
    const readOption = document.createElement('option');
    readOption.value = 'read';
    readOption.textContent = 'read';
    readDropdown.append(readOption);
    //create "not read yet" option for readDropdown
    const readOption2 = document.createElement('option');
    readOption2.value = 'not read yet'
    readOption2.textContent = 'not read yet';
    readDropdown.append(readOption2);

    //create submit button
    const submitBookBtn = document.createElement('button');
    submitBookBtn.type = 'submit';
    submitBookBtn.textContent = 'Submit';
    newBookForm.append(submitBookBtn);
    //submit button will add book to myLibrary
    submitBookBtn.addEventListener('click', () => {
        //prevent page refresh
        preventRefresh();
        //make sure user inputs book title before submitting
        if (document.getElementById('title').value === '') {
            alert('Please input book title.');
        //make sure user inputs author name before submitting
        } else if (document.getElementById('author').value === '') {
            alert('Please input author name.')
        //make sure user inputs page number before submitting
        } else if (document.getElementById('pages').value === '') {
            alert('Please input page number.')
        //make sure user inputs a valid page number before submitting
        } else if (document.getElementById('pages').value < 1) {
            alert('Please input a valid page number');
        } else {
            //create new book with data provided
            let book = new Book(
                document.getElementById('title').value,
                document.getElementById('author').value,
                document.getElementById('pages').value,
                document.querySelector('select').value
            )
            //then add the book to myLibrary
            myLibrary.push(book);
            //remove form elements
            titleLabel.remove();
            titleInput.remove();
            authorLabel.remove();
            authorInput.remove();
            pagesLabel.remove();
            pagesInput.remove();
            readDropdown.remove();
            submitBookBtn.remove();
        }
    })
}

//Prevent form from refreshing page when submit button is clicked
function preventRefresh() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        event.preventDefault();
    })
}

function displayBooks() {
    //clear previous cards
    const previousCards = document.querySelectorAll('.card');
    previousCards.forEach((card) => {
        card.remove();
    })

    //set variable for container
    const container = document.querySelector('.container');
    //create a card for every book in myLibrary
    for (let i = 0; i < myLibrary.length; i++) {
        let x = myLibrary[i];
        //create card and put it in container
        const card = document.createElement('div');
        card.className = 'card';
        card.id = i;
        container.append(card);
        //put title info in card
        const bookTitle = document.createElement('div');
        bookTitle.textContent = `Title: ${x.title}`;
        card.append(bookTitle);
        //put author info in card
        const bookAuthor = document.createElement('div');
        bookAuthor.textContent = `Author: ${x.author}`;
        card.append(bookAuthor);
        //put pages info in card
        const bookPages = document.createElement('div');
        bookPages.textContent = `Pages: ${x.pages}`;
        card.append(bookPages);
        //put read info in card
        const bookRead = document.createElement('div');
        bookRead.textContent = `Read: ${x.read}`;
        bookRead.id = -i - 1;
        card.append(bookRead);
        //add button to change "read" status
        const readBtn  = document.createElement('button');
        readBtn.textContent = 'read/unread';
        readBtn.dataset.readId = -i -1;
        card.append(readBtn);
        //make readBtn toggle "read" status
        readBtn.addEventListener('click', () => {
            const readId = readBtn.dataset.readId
            const read = document.getElementById(readId)
            if (read.textContent === 'Read: read') {
                read.textContent = 'Read: not read yet';
                myLibrary[i].read = 'not read yet';
            } else if (read.textContent === 'Read: not read yet') {
                read.textContent = 'Read: read';
                myLibrary[i].read = 'read';
            } else {
                alert('readBtn error');
            }
        })
        //add remove button
        const rmButton = document.createElement('button');
        rmButton.textContent = 'Remove';
        rmButton.dataset.cardId = i;
        card.append(rmButton);
        //make rmButton remove book when clicked
        rmButton.addEventListener('click', () => {
            const cardId = rmButton.dataset.cardId
            const card = document.getElementById(cardId)
            card.remove(); //remove card
            myLibrary.splice(i, 1); //remove book from myLibrary
        })
    }
}