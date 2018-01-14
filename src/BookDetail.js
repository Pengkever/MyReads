import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import NavLink from './NavLink'
import SelectShelf from './SelectShelf'

class BookDetail extends Component {
    state = {
        book: null
    }
    /* 组件挂载时，根据url传递来的id参数，从服务器获取图书数据 */
    componentWillMount() {
        const bookId = this.props.match.params.id
        BooksAPI.get(bookId)
        .then((book) => this.setState({
            book: book
        }))
        .catch((e) => this.setState({
            book: null
        }))
    }
    /* 书架信息更新后，上传服务器 */
    handleChangeShelf = (shelf) => {
        if (this.props.handleChangeShelf) {
            this.props.handleChangeShelf(this.state.book, shelf)
        }
    }

    render() {
        const { book } = this.state

        return (
            <div className="book-detail">
                <div className="book-detail-topbar"><NavLink className='close-search' to="/">back shelf</NavLink></div>
                {book?(
                    <div className="book-subject">
                        <div className="book-content">
                            <SelectShelf shelf={book.shelf} handleChangeShelf={this.handleChangeShelf}/>
                            <div className="book-cover" 
                             style={{
                                width: 128,
                                height: 192,
                                backgroundImage: book.imageLinks? `url(${book.imageLinks.thumbnail})`: 'url("")' || 'url("")'}}>                                
                            </div>
                            <div className="book-info">
                                <h2>{book.title}</h2>
                                <div>Authors: {book.authors? (book.authors.join(', ')): ''}</div>
                                <div>Version: {book.contentVersion}</div>
                                <div>Language: {book.language}</div>
                                <div>PageCount: {book.pageCount}</div>
                                <div>PublishedDate: {book.publishedDate}</div>
                                <NavLink to={`${book.previewLink}`}>previewLink</NavLink>
                            </div>                        
                        </div>
                        <div className="book-description">Description: 
                            <article>{book.description}</article>
                        </div>                        
                    </div>)
                : (<div className="book-wait">waiting seconds</div>)}
            </div>
        )
    }
}

export default BookDetail