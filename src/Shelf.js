import React, { Component } from 'react'
import NavLink from './NavLink'
import BookShelf from './BookShelf'

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
    handleChangeShelf = (book, shelf) => {        
        if (this.props.handleChangeShelf) {
            this.props.handleChangeShelf(book, shelf)
        }
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
                        <BookShelf handleChangeShelf={this.handleChangeShelf} key={"currentlyReading"} name={"Currently Reading"} books={currentlyReading} />
                        <BookShelf handleChangeShelf={this.handleChangeShelf} key={"wantToRead"} name={"Want to Read"} books={wantToRead} />
                        <BookShelf handleChangeShelf={this.handleChangeShelf} key={"read"} name={"Read"} books={read} />
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
