import React, { Component } from 'react'
import NavLink from './NavLink'

import Book from './Book'
import { search } from './BooksAPI'

class SearchBook extends Component {

    state = {
        books: [],
        localBooks: []
    }
    componentWillMount() {
        this.setState({localBooks: this.props.books})
    }
    ComponentWillReceiveProps(nextProps) {
        this.setState({localBooks: nextProps.books})
    }
    /* 输入内容改变，从服务器搜索图书 */
    updateQuery = (event) => {
        if (event.key === 'Enter') {
            let query = event.target.value
            query = query.trim()
            query? this.searchBook(query) : this.setState({books: []})
        }
    }

    searchBook = (query) => {
        search(query)
        .then((books) => {
            books = this.checkBookofShelf(books)
            this.setState({books: books})
        })
        .catch((e) => {
            this.setState({books: null})
        })
    }
    checkBookofShelf = books => {
        if (this.state.localBooks) {
            for (const book of this.state.localBooks) {
                books = books.map(b => {
                    if (b.id === book.id) {
                        b.shelf = book.shelf
                    }
                    return b
                })
            }
        }

        return books
    }
    handleChangeShelf = (book, shelf) => {
        if (this.props.handleChangeShelf) {
            this.props.handleChangeShelf(book, shelf)
        }
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
                        onKeyPress={(event) => this.updateQuery(event)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    {books? (
                        <ol className="books-grid">
                            {books.map((book) => (
                                <li key={book.id}>
                                    <Book book={book} handleChangeShelf={this.handleChangeShelf}/>
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
