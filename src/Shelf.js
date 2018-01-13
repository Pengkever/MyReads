import React, { Component } from 'react'
import NavLink from './NavLink'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class Shelf extends Component {

    state = {
        "currentlyReading": [],
        "wantToRead": [],
        "read": []
    }
    componentWillMount() {
        this.updateState(this.props.books)
    }
    /* 属性更新时，更新组件状态 */
    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps.books)
    }
    
    /* 上传更改过后的书籍数据 */
    handUpBook = (book) => {

        /* 移动图书时，同时刷新书架以便展示移动后的状态
         * 但有两种数据来源，来更改此时的状态
         * 1、由于上传了图书，利用BooksAPI.getAll再次获取数据，然后setState，达到效果
         *    （但是，由于异步获取，使得移动效果有迟滞感）
         * 2、收集此前各个书架书籍，集中处理后，再分配
         *    （消除迟滞感）
         */

        let books = [...this.state.currentlyReading, ...this.state.wantToRead, ...this.state.read]
        books = books.filter((b) => b.title !== book.title)
        books.push(book)
        this.updateState(books)
        
        BooksAPI.update(book, book.shelf)

    }

    /* 分配图书至书架及更新状态 */
    updateState = (books) => {

        this.setState({
            "currentlyReading": books.filter((b) => b.shelf === "currentlyReading"),
            "wantToRead": books.filter((b) => b.shelf === "wantToRead"),
            "read": books.filter((b) => b.shelf === "read")
        })
    }


    render() {

        const { currentlyReading, wantToRead, read } = this.state
        
        return (

            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>                       
                        <BookShelf handUpBook={this.handUpBook} key={"currentlyReading"} name={"Currently Reading"} books={currentlyReading} />
                        <BookShelf handUpBook={this.handUpBook} key={"wantToRead"} name={"Want to Read"} books={wantToRead} />
                        <BookShelf handUpBook={this.handUpBook} key={"read"} name={"Read"} books={read} />
                    </div>
                </div>
                <div className="open-search">
                    <NavLink className="open-search" to='/search'>Add a book</NavLink>
                </div>
            </div>
        )
    }
}

export default Shelf
