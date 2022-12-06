'use strict'
var gCurrLang = 'en'

var gTrans = {

    title: {
        en: 'Book Shop',
        he: 'חנות ספרים'
    },
    'filter-title': {
        en: 'Filter',
        he: 'סינון לפי'
    },
    'filter-price': {
        en: 'MaxPrice:',
        he: 'מחיר מקסימלי:'
    },
    'filter-rate': {
        en: 'TopRate:',
        he: 'דירוג'
    },
    'btn-submit': {
        en: 'submit',
        he: 'שלח'
    },
    'btn-add-book': {
        en: 'Add Book',
        he: 'הוסף ספר'
    },
    'filter-books-placeholder': {
        en: 'Search By Text',
        he: 'חפש על ידי טקסט'
    },
    'book-id': {
        en: 'Id',
        he: 'מקט'
    },
    'book-name': {
        en: 'Book Name',
        he: 'שם הספר'
    },
    'book-rate': {
        en: 'Rate',
        he: 'דירוג'
    },
    'book-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'book-img': {
        en: 'Image',
        he: 'תמונה'
    },
    'book-action': {
        en: 'Actions',
        he: 'פעולות'
    },
    'btn-read': {
        en: 'Read',
        he: 'קרא'
    },
    'btn-update': {
        en: 'Update',
        he: 'עדכן'
    },
    'btn-delete': {
        en: 'Delete',
        he: 'מחק'
    },
    'btn-prev-page': {
        en: 'Prev Page',
        he: 'עמוד קודם'
    },
    'btn-next-page': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'btn-close-modal': {
        en: 'Close',
        he: 'סגור'
    },

}

function getTrans(transKey) {
    // done: if key is unknown return 'UNKNOWN'
    const key = gTrans[transKey]
    if (!key) return 'UNKNOWN'

    // done: get from gTrans
    var translation = key[gCurrLang]

    // done: If translation not found - use english
    if (!translation) translation = key.en

    return translation
}

function doTrans() {
    // done: 
    // var els = document.querySelectorAll('[data-trans]'
    // for each el:
    //    get the data-trans and use getTrans to replace the innerText 
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        const transKey = el.dataset.trans
        const translation = getTrans(transKey)
        el.innerText = translation
        // done: support placeholder    
        if (el.placeholder) el.placeholder = translation
    })
}

function setLang(lang) {
    gCurrLang = lang
}

