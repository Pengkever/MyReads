import React, { Component } from 'react'

import SelectShelf from './SelectShelf'

class Book extends Component {    

    
    componentWillMount() {
        this.setState({
            book: this.props.book
        })
    }
    

    changeBookShelf = (shelf) => {

        this.setState((state) => {
            state.book.shelf = shelf
            this.handUpBook(state.book)
        })
        // 由于setState不是同步执行，需要延迟执行
        // 可使用上述或如下方式
        /* const self = this
        setTimeout(function() {
            self.handUpBook(self.state.book)
        },0) */
    }

    handUpBook = (book) => {
        if (this.props.handUpBook) {
            this.props.handUpBook(book)
        }
    }

    getShelf = (shelf) => {

        this.changeBookShelf(shelf)
    }
    
    render() {

        const { book } = this.state
        
        return (

            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: book.style.width,
                        height: book.style.height,
                        backgroundImage: book.style.backgroundImage
                    }}></div>
                    <SelectShelf shelf={book.shelf} getShelf={this.getShelf} selectInfoState={book.selectInfoState} updateValue={this.updateValue}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors.join(', ')}</div>
            </div>
        )
    }
}

export default Book
                        /*<select value={''} onChange={(e) => this.changeShelf(e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>*/