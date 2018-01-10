
import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {

    /* 传递改动后的书籍信息 */  

    handUpBook = (book) => {
        
        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }

    render() {

        const {name, books} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
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

export default BookShelf