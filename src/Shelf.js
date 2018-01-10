import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'




class Shelf extends Component {
    /* 组件加载时，更新组件状态 */
    componentWillMount() {
        
        this.updateState()
    }
    /* 组件属性值发生变化时，更新组件状态 */
    componentWillReceiveProps() {

        this.updateState()
    }
    /* 上传更改过后的书籍数据 */
    handUpBook = (book) => {
        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }
    /* 更新状态函数 */
    updateState = () => {

        this.setState({
            "currentlyReading": this.props.books.filter((b) => b.shelf === "Currently Reading"),
            "wantToRead": this.props.books.filter((b) => b.shelf === "Want to Read"),
            "read": this.props.books.filter((b) => b.shelf === "Read")
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
                    <Link className="open-search" to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Shelf
    