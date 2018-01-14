import React, { Component } from 'react'
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
    handleChangeShelf = shelf => {
        if (this.props.handleChangeShelf) {
            this.props.handleChangeShelf(this.state.book, shelf)
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
                        handleChangeShelf={this.handleChangeShelf}
                    />                    
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors? (book.authors.join(', ')): ''}</div>
            </div>
        )
    }
}

export default Book