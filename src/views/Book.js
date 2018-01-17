import React, { Component } from 'react'
import SelectShelf from './SelectShelf'
import NavLink from './NavLink'
// import BookStore from '../stores/BookStore'
import * as Actions from '../Actions'
// import PropTypes from 'prop-types'

class Book extends Component {
  constructor(props) {
    super(props)

    // this.onChange = this.onChange.bind(this)

    this.state = {
      book: props.book
    }
  }
  /* static propTypes = {
    id: PropTypes.string.isRequired
  }
   组件挂载时，更新状态
  componentWillMount() {
    this.setState({
      book: this.props.book
    })
  }    */
  /* 书架发生变动时，更新状态并上传本书最新状态到服务器
  changeBookShelf = (shelf) => {
    console.log('Book changeBookShelf')
    Actions.change(this.state.book, shelf)
  } */
  // 传递状态给父组件 
  /*componentDidMount() {
    BookStore.addChangeListener(this.onChange)
  }
  compoenentWillUnmount() {
    BookStore.removeChangeListener(this.onChange)
  }
  onChange() {
    console.log('Book onChange')
    const newBook = BookStore.getBook(this.props.id)
    this.setState({book: newBook})
  }*/
  handUpBook = (shelf) => {
    Actions.change(this.state.book, shelf)
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
              backgroundImage: book.imageLinks? (book.imageLinks.thumbnail? `url(${book.imageLinks.thumbnail})` : 'url("")') : 'url("")' }}>
            </div>
          </NavLink>}                                       
          <SelectShelf shelf={book.shelf} id={book.id} handUpShelf={this.handUpBook}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors? (book.authors.join(', ')): ''}</div>
      </div>
    )
  }
}

export default Book