
import React, { Component } from 'react'
import Book from './Book'
import BookStore from '../stores/BookStore'
import PropTypes from 'prop-types'


class BookShelf extends Component {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)
        this.state = {
            books: BookStore.getBooks(this.props.caption) || null
        }
    }
    /* 传递改动后的书籍信息
    handUpBook = (book) => {        
        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }*/
    static propTypes = {
        caption: PropTypes.string.isRequired
    }
    componentDidMount() {
        BookStore.addChangeListener(this.onChange)
    }
    componentWillUnmount() {
        BookStore.removeChangeListener(this.onChange)
    }
    onChange() {
        const newBooks = BookStore.getBooks(this.props.caption)
        this.setState({books: newBooks})
    }

    render() {

        const { name } = this.props
        const { books } = this.state

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books? (books.map((book) => (
                        <li key={book.id}>
                            <Book book={book}/>
                        </li>
                        ))): ('')}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf