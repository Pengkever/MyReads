
import React, { Component } from 'react'
import Book from './Book'


class BookShelf extends Component {

    /* 传递改动后的书籍信息 */  

    handleChangeShelf = (book, shelf) => {        
        if (this.props.handleChangeShelf) {
            this.props.handleChangeShelf(book, shelf)
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
                            <Book book={book} handleChangeShelf={this.handleChangeShelf}/>
                        </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf