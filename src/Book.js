import React, { Component } from 'react'
import SelectShelf from './SelectShelf'
import * as BooksAPI from './BooksAPI'
import NavLink from './NavLink'

class Book extends Component {
    /* 组件挂载时，更新状态*/
    componentWillMount() {
        this.setState({
            book: this.props.book
        })
    }    
    /* 书架发生变动时，更新状态并上传本书最新状态到服务器 */
    changeBookShelf = (shelf) => {

        this.setState((state) => {
            state.book.shelf = shelf
            this.handUpBook(state.book)

            BooksAPI.update(state.book, shelf)
        })
        // 由于setState不是同步执行，需要延迟执行
        // 可使用上述或如下方式
        /* const self = this
        setTimeout(function() {
            self.handUpBook(self.state.book)
        },0) */
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
                             style={!book.style? ({
                                width: 128,
                                height: 192,
                                backgroundImage: 'url("")'})
                                : ({
                                    width: book.style.width || 128,
                                    height: book.style.height || 192,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})` || 'url("")'})
                                }>
                        </div>
                    </NavLink>}                                       
                    <SelectShelf shelf={book.shelf} getShelf={this.changeBookShelf} selectInfoState={book.selectInfoState} updateValue={this.updateValue}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors? (book.authors.join(', ')): ''}</div>
            </div>
        )
    }
}

export default Book