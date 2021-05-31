const notCompleteListBook = "belum";
const completeListBook = "selesai";
const bookId = "bookId";
const btnYes = document.getElementById("yakin");
const btnNo = document.getElementById("tidak");
const btnCancel = document.getElementById("batal");
const modalCustom = document.getElementById("myModal");
const modalEdit = document.getElementById("modalEdit");

function addBook() {
  const notCompleteBook = document.getElementById(notCompleteListBook);
  const completeBook = document.getElementById(completeListBook);
  const titleBook = document.getElementById("title").value;
  const authorBook = document.getElementById("author").value;
  const yearBook = document.getElementById("year").value;
  const isCompleted = document.getElementById("check").checked;
  const detailsBook = makeShelfBook(
    titleBook,
    authorBook,
    yearBook,
    isCompleted
  );
  if (isCompleted !== false) {
    completeBook.append(detailsBook);
  } else {
    notCompleteBook.append(detailsBook);
  }
  const bookData = bukuData(titleBook, authorBook, yearBook, isCompleted);
  detailsBook[bookId] = bookData.id;
  books.push(bookData);
  updateStorage();
}

function makeShelfBook(title, author, year, isCompleted) {
  const titleBook = document.createElement("p");
  titleBook.innerText = title;
  titleBook.classList.add("title-buku");
  const authorBook = document.createElement("p");
  authorBook.innerText = author;
  authorBook.classList.add("author-buku");
  const yearBook = document.createElement("p");
  yearBook.innerText = year;
  yearBook.classList.add("year-buku");
  const diviers = document.createElement("div");
  const container = document.createElement("div");
  container.classList.add("book");
  container.append(titleBook, authorBook, yearBook);
  if (isCompleted === true) {
    diviers.classList.add("divier-done");
    container.append(btnDone(), btnEdit(), btnDelete(), diviers);
  } else {
    diviers.classList.add("divier");
    container.append(btnNotComplete(), btnEdit(), btnDelete(), diviers);
  }

  return container;
}

function setBookDone(elementBook) {
  const bookCompleted = document.getElementById(completeListBook);
  const titleBook = elementBook.querySelector(".title-buku").innerText;
  const authorBook = elementBook.querySelector(".author-buku").innerText;
  const yearBook = elementBook.querySelector(".year-buku").innerText;
  const newBook = makeShelfBook(titleBook, authorBook, yearBook, true);
  const bookData = findBook(elementBook[bookId]);
  bookData.isCompleted = true;
  newBook[bookId] = bookData.id;

  bookCompleted.append(newBook);
  elementBook.remove();
  updateStorage();
}

function bookNotComplete(elementBook) {
  const bookNotComplete = document.getElementById(notCompleteListBook);
  const titleBook = elementBook.querySelector(".title-buku").innerText;
  const authorBook = elementBook.querySelector(".author-buku").innerText;
  const yearBook = elementBook.querySelector(".year-buku").innerText;
  const newBook = makeShelfBook(titleBook, authorBook, yearBook, false);
  const bookData = findBook(elementBook[bookId]);
  bookData.isCompleted = false;
  newBook[bookId] = bookData.id;
  bookNotComplete.append(newBook);
  elementBook.remove();
  updateStorage();
}

function editBuku(elementBook) {
  const notCompleteBook = document.getElementById(notCompleteListBook);
  const completeBook = document.getElementById(completeListBook);
  const titleBook = document.getElementById("title-edit").value;
  const authorBook = document.getElementById("author-edit").value;
  const yearBook = document.getElementById("year-edit").value;
  const isCompleted = document.getElementById("check-edit").checked;
  const detailsBook = makeShelfBook(
    titleBook,
    authorBook,
    yearBook,
    isCompleted
  );
  const bookData = findBook(elementBook[bookId]);
  bookData.title = titleBook;
  bookData.author = authorBook;
  bookData.year = yearBook;
  bookData.isCompleted = isCompleted;
  if (isCompleted === true) {
    elementBook.remove();
    completeBook.append(detailsBook);
  } else {
    elementBook.remove();
    notCompleteBook.append(detailsBook);
  }
  // elementBook.remove();
  updateStorage();
}

function makeBtn(title, classType, eventListener) {
  const button = document.createElement("button");
  button.innerText = title;
  button.classList.add(classType);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });
  return button;
}

function removeFromShelf(book) {
  const bookPosition = findBookIndex(book[bookId]);
  books.splice(bookPosition, 1);

  book.remove();
  updateStorage();
}

function btnNotComplete() {
  return makeBtn("Selesai", "btn-done", function (event) {
    setBookDone(event.target.parentElement);
  });
}

function btnEdit() {
  return makeBtn("Edit", "btn-edit", function (event) {
    const editForm = document.getElementById("form-edit");
    const targetElement = event.target.parentElement.children;
    modalEdit.style.display = "block";
    document.getElementById("title-edit").value = targetElement[0].innerText;
    document.getElementById("author-edit").value = targetElement[1].innerText;
    document.getElementById("year-edit").value = targetElement[2].innerText;
    if (event.target.parentElement.lastChild.className == "divier-done") {
      document.getElementById("check-edit").checked = true;
    } else {
      document.getElementById("check-edit").checked = false;
    }
    editForm.addEventListener("submit", () => {
      editBuku(event.target.parentElement);
      modalEdit.style.display = "none";
    });
  });
}

function btnDelete() {
  return makeBtn("Hapus", "btn-hapus", function (event) {
    modalCustom.style.display = "block";
    btnYes.onclick = () => {
      removeFromShelf(event.target.parentElement);
      modalCustom.style.display = "none";
    };
  });
}

function btnDone() {
  return makeBtn("Belum Selesai", "btn-done", function (event) {
    bookNotComplete(event.target.parentElement);
  });
}

btnCancel.onclick = () => {
  modalEdit.style.display = "none";
};

btnNo.onclick = () => {
  modalCustom.style.display = "none";
};

window.onclick = (event) => {
  if (event.target == modalCustom || event.target == modalEdit) {
    modalCustom.style.display = "none";
    modalEdit.style.display = "none";
  }
};
