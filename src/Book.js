import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import NavLink from './NavLink'
import SelectShelf from './SelectShelf'

class Book extends Component {
    /* 组件挂载时，更新状态*/
    componentWillMount() {
        this.setState({
            book: this.props.book
        })
    }    
    /* 书架发生变动时，更新状态并上传本书最新状态到服务器 */
    handleChange = shelf => {
        this.setState(state => {
            state.book.shelf = shelf

            this.handUpBook(state.book)

            BooksAPI.update(state.book, shelf)
        })
    }
    /* 传递状态给父组件 */
    handUpBook = (book) => {
        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }
    
    render() {

        const { book } = this.state
        
        return (

            <div className="book">
                <div className="book-top">                    
                    {<NavLink to={`/detail/${book.id}`}>
                        <div className="book-cover" 
                             style={{
                                width: 128,
                                height: 192,
                                backgroundImage: book.imageLinks? `url(${book.imageLinks.thumbnail})`: 'url("")' || 'url("")'}}>                                
                        </div>
                    </NavLink>}
                    <SelectShelf 
                        shelf={book.shelf} 
                        getShelf={this.handleChange}
                    />                    
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors? (book.authors.join(', ')): ''}</div>
            </div>
        )
    }
}

export default Book