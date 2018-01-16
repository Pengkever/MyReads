import React, { Component } from 'react'
import NavLink from './NavLink'

import Book from './Book'
// import { search } from '../BooksAPI'
import BookStore from '../stores/BookStore'

class SearchBook extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)

        this.state = {
            books: null
        }
    }
    searchBook = (query) => {
        query = query.trim()
        BookStore.searchBook(query)
        .then(books => this.setState({books: books}))
        .catch(e => this.setState({books: null}))       
    }
    onChange() {
        console.log('onChange')
    }
    
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
                        onChange={(event) => this.searchBook(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {books? (
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <Book id={book.id}/>
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