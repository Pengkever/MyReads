import React from 'react'
import * as BooksAPI from './BooksAPI'

import { Route } from 'react-router-dom'

import './App.css'
import Shelf from './Shelf'
import SearchBook from './SearchBook'
import SelectShelf from './SelectShelf'

/* 本地图书列表 */
const bookList = [
    {          
        "id": 1,
        "shelf": "Currently Reading",
        "title": "To Kill a Mockingbird",
        "authors": ["Harper Lee"],
        "style": {
            "width": 128,
            "height": 193,
            "backgroundImage": 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")' 
        }
    },
    {          
        "id": 2,
        "shelf": "Currently Reading",
        "title": "Ender's Game",
        "authors": ["Orson Scott Card"],
        "style": {
            "width": 128,
            "height": 188,
            "backgroundImage": 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")' 
        }
    },
    {          
        "id": 3,
        "shelf": "Want to Read",
        "title": "1776",
        "authors": ["David McCullough"],
        "style": {
            "width": 128,
            "height": 193,
            "backgroundImage": 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")' 
        }
    },
    {          
        "id": 4,
        "shelf": "Want to Read",
        "title": "Harry Potter and the Sorcerer's Stone",
        "authors": ["J.K. Rowling"],
        "style": {
            "width": 128,
            "height": 192,
            "backgroundImage": 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")' 
        }
    },
    {          
        "id": 5,
        "shelf": "Read",
        "title": "The Hobbit",
        "authors": ["J.R.R. Tolkien"],
        "style": {
            "width": 128,
            "height": 192,
            "backgroundImage": 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")' 
        }
    },
    {          
        "id": 6,
        "shelf": "Read",
        "title": "Oh, the Places You'll Go!",
        "authors": ["Seuss"],
        "style": {
            "width": 128,
            "height": 174,
            "backgroundImage": 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")' 
        }
    },
    {
        "id": 7,
        "shelf": "Read",
        "title": "The Adventures of Tom Sawyer",
        "authors": ["Mark Twain"],
        "style": {
            "width": 128,
            "height": 192,
            "backgroundImage": 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")' 
        }
    }
]


class BooksApp extends React.Component {

    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        /*showSearchPage: false,*/
        getBooks: [],
        localBooks: []
    }
    /* 当组件加载时，从BookAPI获取数据 */
    componentWillMount() {
        BooksAPI.getAll()
        .then((books) => (this.formatData(books)))
        .then((books) => {
            /*books = books.concat(this.state.localBooks)*/
            this.setState({
                getBooks: books
            })
        })
        /*const localBooks = this.formatData(bookList)*/
        /* 设置本地图书列表状态 */
        this.setState({
            localBooks: bookList
        })

    }
    /* 格式化数据，由于获取的数据没有style属性，在book组件解析时出错，需要先进行初始化 */
    formatData(data) {
        if (!data) return 'error: no data'
        const newData = data
        for (const item of newData) {
            if (!item.style || typeof item.style !== 'object') {
                item.style = {}
                item.style.width = 128
                item.style.height = 192
                item.style.backgroundImamge = `url(${item.imageLinks.thumbnail})`
            }

            item.selectInfoState = false
        }
        return newData
    }
    /* 图书改动之后更新状态 */
    handleBook = (book) => {

        const newList = this.state.localBooks.filter((b) => b.title !== book.title)
        newList.push(book)
        /* 将图书上传至服务器 */
        BooksAPI.update(book, book.shelf);

        this.setState({localBooks: newList})
    }
    

    render() {

        const { getBooks, localBooks } = this.state        

        return (
            <div className="app">
                <Route exact path='/' render={() => (
                    <Shelf books={localBooks} handUpBook={this.handleBook}/>
                )}/>
                <Route path='/search' render={() => (
                    <SearchBook books={getBooks} handUpBook={this.handleBook}/>
                )}/>
                <Route path='/test' render={() => (
                    <SelectShelf />
                )}/>
            </div>
        )
    }
}


export default BooksApp