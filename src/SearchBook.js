import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Book from './Book'

class SearchBook extends Component {

    state = {
        query: ''
    }

    componentWillMount() {
        this.setState((state) => (state.books = this.props.books))
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    /*consoleValue(value) {
        setTimeout(function() {
            console.log(value)
        }, 1000)
    }*/    

    handUpBook = (book) => {

        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }

    render() {
        
        const { books } = this.props
        const { query }= this.state

        let showBooks
        if (query) {
            showBooks = books.filter((book) => book.title.includes(query))
        } else {
            showBooks = books
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Close</Link>
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
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showBooks.map((book) => (
                            <li key={book.title}>
                                <Book book={book} handUpBook={this.handUpBook}/>
                            </li>
                        ))}                        
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook