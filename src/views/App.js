import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import Shelf from './Shelf'
import SearchBook from './SearchBook'
import BookDetail from './BookDetail'
import * as Actions from '../Actions'




class BooksApp extends React.Component {

    /*state = {
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         *
         *
        showSearchPage: false,
        getBooks: [],
        localBooks: []
    }*/
    componentDidMount() {
        Actions.initialData()
    }
    
    /* 路由注册 */
    render() {

        return (
            <div className="app">
                <Route exact path='/' component={Shelf}/>
                <Route path='/search' component={SearchBook}/>
                <Route exact path='/detail/:id' component={BookDetail}/>
            </div>
        )
    }
}

export default BooksApp