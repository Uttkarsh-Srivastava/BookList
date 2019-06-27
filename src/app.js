// Book Class: Respresents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI task

class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "123"

      },
      {
        title: "Book Two",
        author: "John Cena",
        isbn: "787"

      }];
    const books = StoredBooks;

    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
    list.appendChild(row);


  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    div.appendChild(document.createTextNode(message))
    container.insertBefore(div, form);

    //remove after 3 secs

    setTimeout(() => document.querySelector(".alert").remove(), 2500)
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
// Store Class: Handles Storage

// Event: Display Book
document.addEventListener("DOMContentLoaded", UI.displayBooks);
// Event: Add Book

document.querySelector("#book-form").addEventListener("submit", e => {
  e.preventDefault();

  //Get form Values

  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  if (title != "" && author != "" && isbn != "") {

    const book = new Book(title, author, isbn)

    UI.addBookToList(book);
    UI.showAlert("Book Added", "success")
    UI.clearFields();
  }
  else {
    UI.showAlert("Please Enter The Details", "danger")
  }
})


// Event: Remove Book

document.querySelector("#book-list").addEventListener("click", (e) => {
  if (e.target.classList.contains('delete')) {
    if (confirm("Are you sure ?")) {
      e.target.parentElement.parentElement.remove();
      UI.showAlert("Book Removed", "success")
    }
  }
});