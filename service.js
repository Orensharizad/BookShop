'use strict'


const STORAGE_KEY = 'bookDB'
const gBooksNames = ['harryPotter', 'bagsBuny', 'richDad', 'business']
const PAGE_SIZE = 8

var gBooks
var gFilterBy = { maxPrice: 250, topRate: 0, name: '' }
var gPageIdx = 0
var gSortBy = ''



_createBooks()

function getBooks() {
    gBooks = sortBooks()

    var books = gBooks.filter(book =>
        book.price <= gFilterBy.maxPrice &&
        book.rate >= gFilterBy.topRate
        && book.name.includes(gFilterBy.name)
    )

    var startIdx = gPageIdx * PAGE_SIZE
    return books.slice(startIdx, startIdx + PAGE_SIZE)
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 30; i++) {
            var booksNames = gBooksNames[getRandomIntInclusive(0, gBooksNames.length - 1)]
            books.push(_createBook(booksNames))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name) {

    return {
        id: makeId(),
        name,
        price: getRandomIntInclusive(0, 250),
        desc: makeLorem(),
        rate: getRandomIntInclusive(4, 10),


    }

}


function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function addBook(bookName) {
    const book = _createBook(bookName)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function deleteBook(bookId) {
    const book = gBooks.findIndex(book => bookId === book.id)
    console.log('book', book)
    gBooks.splice(book, 1)
    _saveBooksToStorage()

}

function updateBook(bookId, newName) {
    const book = gBooks.find(book => bookId === book.id)
    book.name = newName
    _saveBooksToStorage()
    return book

}

function rateBook(rate, bookId) {
    var book = getBookById(bookId)
    book.rate = rate
    console.log(rate);
    _saveBooksToStorage()

}

function setBookFilter(filterBy = {}) {

    if (filterBy.name !== undefined) gFilterBy.name = filterBy.name
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.topRate !== undefined) gFilterBy.topRate = filterBy.topRate

    console.log(gFilterBy)

    return gFilterBy

}

function nextpage() {

    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
    console.log(gPageIdx)
}

function prevPage() {
    if (gPageIdx === 0) return
    gPageIdx--
    console.log(gPageIdx)

}

function getPageIdx() {
    return gPageIdx
}

function getPageSize() {
    return PAGE_SIZE
}


function setSortBy(sortBy) {

    gSortBy = sortBy
    console.log('sortBy', sortBy)
}



function sortBooks() {
    gBooks.sort(function (a, b) {
        if (gSortBy === 'name') {
            return a.name.localeCompare(b.name)
        }
        else if (gSortBy === 'price') return b.price - a.price
    })

    return gBooks

}