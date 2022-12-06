'use strict'


function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    renderBooksCard()
}

function renderBooks() {
    const books = getBooks()
    const strHTMLs = books.map(book => {
        return ` 
         <tr>
          <td>  ${book.id}</td>
          <td>  ${book.name}</td>
          <td> ${book.rate}</td>
          <td><img class = "book-img" src="imgs/Book.jpg" alt="">
          </td>
        <td> ${book.price} $</td>
        <td class ="read-btn"><button class="btn btn-info" data-trans="btn-read" onclick="onReadBook('${book.id}')">${getTrans("btn-read")}</button> </td>
        <td class ="update-btn"><button class="btn btn-info" data-trans="btn-update" onclick="onUpdateBook('${book.id}')">${getTrans("btn-update")}</button> </td>
        <td class ="delete-btn"><button class="btn btn-info" data-trans="btn-delete" onclick="onDeleteBook('${book.id}')">${getTrans("btn-delete")}</button> </td>
         </tr>
      
    `
    })
    renderPageNum()
    document.querySelector('tbody').innerHTML = strHTMLs.join('')
}



function onAddBook() {

    var bookName = prompt('book?')
    if (!bookName) return
    addBook(bookName)
    renderBooks()
    flashMsg('A new book has been added to the store ')
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    renderBooksCard()
    flashMsg('Book Deleted !')
}


function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal1')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = `Price: ${book.price}`
    elModal.querySelector('p').innerText = book.desc
    elModal.querySelector('.book-id-hidden').innerText = bookId
    elModal.querySelector('.modal-input').value = book.rate || 1
    elModal.classList.add('open')
}

function onCloseModal() {
    var elModal = document.querySelector('.modal1')
    elModal.classList.remove('open')
}
function onUpdateBook(bookId) {
    var newBookName = prompt('book name ?')
    updateBook(bookId, newBookName)
    renderBooks()
    renderBooksCard()
    flashMsg(`Book name Update to : ${newBookName}`)
}


function flashMsg(msg) {
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')

    setTimeout(() => {
        el.classList.remove('open')

    }, 4000);
}


function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function onRateBook(rate) {
    var bookId = document.querySelector('.book-id-hidden').innerText
    rateBook(rate, bookId)
    renderBooks()
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    renderBooksCard()

    const queryStringParams = `?name=${filterBy.name}&maxPrice=${filterBy.maxPrice}&topRate=${filterBy.topRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onNextPage() {

    nextpage()
    renderBooks()

}

function onPrevPage() {
    prevPage()
    renderBooks()

}

function renderPageNum() {
    const page = document.querySelector('.page h5')
    const checkPageIdx = getPageIdx()
    page.innerText = checkPageIdx
    // disabledBtn()
}

function disabledBtn() {
    const prevBtn = document.querySelector('.prev-btn')
    const checkPageIdx = getPageIdx()
    prevBtn.disabled = (!checkPageIdx) ? true : false
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        name: queryStringParams.get('bookName') || '',
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        topRate: +queryStringParams.get('topRate') || 0
    }

    if (!filterBy.name && !filterBy.maxPrice && !filterBy.topRate) return

    document.querySelector('.filter-name').value = filterBy.name
    document.querySelector('.filter-price-range').value = filterBy.maxPrice
    document.querySelector('.filter-toprate-range').value = filterBy.topRate
    setBookFilter(filterBy)
}

function onSetSortBy(sortBy) {

    setSortBy(sortBy)
    renderBooks()
}

function onSetLang(lang) {
    setLang(lang)
    // done: if lang is hebrew add RTL class to document.body
    if (lang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')

    doTrans()
    renderBooks()
}

function renderBooksCard() {
    var books = getBooks()
    var strHtmls = books.map(book => `
        <article class="book-preview container-fluid ">
      
        <div class="book-id">id: ${book.id}</div>
              <div class="title">title: ${book.name}</div>
              <img class="book-img" src="imgs/Book.jpg" alt="">
              <div class="price" min="0"
              max="1000">Price:${book.price}$</div>
              <div class="rating " min="1"
              max="10">Rate:${book.rate}</div>
              <div class="three-btn-container">
              <div class="action">
              <td class ="read-btn"><button class="btn btn-info" data-trans="btn-read" onclick="onReadBook('${book.id}')">${getTrans("btn-read")}</button> </td>
        <td class ="update-btn"><button class="btn btn-info" data-trans="btn-update" onclick="onUpdateBook('${book.id}')">${getTrans("btn-update")}</button> </td>
        <td class ="delete-btn"><button class="btn btn-info" data-trans="btn-delete" onclick="onDeleteBook('${book.id}')">${getTrans("btn-delete")}</button> </td>
              </div>
        </article> 
        `
    )
    document.querySelector('.books-container').innerHTML = strHtmls.join('')
}

function onToggleView() {
    var cards = document.querySelector('.books-container')
    var table = document.querySelector('table')
    cards.classList.toggle('hidden')
    table.classList.toggle('hidden')
}