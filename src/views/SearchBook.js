import React, { Component } from 'react'
import NavLink from './NavLink'

import Book from './Book'
import { search } from '../BooksAPI'
import BookStore from '../stores/BookStore'

class SearchBook extends Component {
    constructor(props) {
        super(props)

        /*this.onChange = this.onChange.bind(this)*/
        this.searchBook = this.searchBook.bind(this)
        this.checkBooks = this.checkBooks.bind(this)

        this.state = {
            books: null
        }
    }
    searchBook = (event) => {
        if (event.key === 'Enter') {
            let query = event.target.value
            query = query.trim()
            search(query)
            .then(books => {
                books = this.checkBooks(books)
                this.setState({books: books})
            }).catch(e => this.setState({books: null}))            
        }
    }
    checkBooks = (books) => {
        let localBooks = []
        for (const shelfCaption of BookStore.getShelfNameList()) {
            localBooks = localBooks.concat(BookStore.getBooks(shelfCaption))
        }
        /*for (const localBook of localBooks) {
            for (const book of books) {
                if (localBook.id === book.id) {
                    book.shelf = localBook.shelf
                }
            }
        }*/
        books.forEach((book, index) => {
            localBooks.forEach((localBook, localIndex) => {
                if (book.id === localBook.id) {
                    book.shelf = localBook.shelf
                    // 基于不重复原则，此书匹配中后，可以除去，减少下一次循环次数
                    localBooks.splice(localIndex, 1)
                }
            })
        })

        return books
    }
    /*onChange(query) {
        if (!query) return
        console.log('onChange')
        query = query.trim()
        Actions.search(query)
    }
    componentDidMount() {
        BookStore.addChangeListener(this.onChange)
    }
    componentWillUnmount() {
        BookStore.removeChangeListener(this.onChange)
    }*/
    
    render() {
        
        const { books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <NavLink className='close-search' to='/'>Close</NavLink>
                    <div className="search-books-input-wrapper">
                        {
                        /*
                          NOTES: The search from BooksAPI is limited to a particular set of search terms.
                          You can find these search terms here:
                          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                          you don't find a specific author or title. Every search is limited by search terms.
                         */
                        }
                        <input
                        type="text"
                        placeholder="Search by title or author"
                        onKeyPress={(event) => this.searchBook(event)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {books? (
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <Book book={book}/>
                                </li>
                            ))}                        
                        </ol>
                    ) : (
                        <div>there is no match book</div>
                    )}
                </div>
            </div>
        )
    }
}

export default SearchBook