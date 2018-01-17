import AppDispatcher from '../AppDispatcher'
import * as ActionTypes from '../ActionTypes'
import { EventEmitter } from 'events'
import * as BooksAPI from '../BooksAPI'

const CHANGE_EVENT = 'changed'

let bookList = []

const BookStore = Object.assign({}, EventEmitter.prototype, {
  getBooks: function(shelfCaption) {
    return bookList.filter(b => b.shelf === shelfCaption)
  },
  getBook: function(bookId) {
    return bookList.filter(b => b.id === bookId)[0]
  },
  getShelfNameList: function() {
    return ['currentlyReading', 'wantToRead', 'read', 'None']
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT)
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }
})


BookStore.dispatchToken = AppDispatcher.register(action => {
  if (action.type === ActionTypes.CHANGE_SHELF) {
    BooksAPI.update(action.book, action.shelf)
    action.book.shelf = action.shelf
    bookList = bookList.filter(b => b.id !== action.book.id)
    bookList.push(action.book)    
    BookStore.emitChange()
  }
  if (action.type === ActionTypes.SEARCH) {
    BookStore.emitChange()
  }
  if (action.type === ActionTypes.INIT) {
    BooksAPI.getAll()
    .then(books => bookList = books)
    .then(() => BookStore.emitChange())
  }
})

export default BookStore