import React, { Component } from 'react'
import BookStore from '../stores/BookStore'
// import * as Actions from '../Actions'

class SelectShelf extends Component {

    /*state = {
        options: ['currentlyReading', 'wantToRead', 'read', 'None'],
        options: [{currentlyReading: 'Currently Reading'}, { wantToRead: 'Want to Read'}, {read: 'Read'}, {none: 'None'}],
        currentValue: false,
        currentShelf: null
    }*/
    /* 监控选项改变 
    handleChange = (shelf) => {
        // 只有当shelf 发生改变时，才执行
        if (shelf !== this.state.currentShelf) {
            this.setState({currentShelf: shelf})

            if (this.props.getShelf) {
                this.props.getShelf(shelf)
            }            
        }
    }*/
    constructor(props) {
        super(props)

        this.state = {
            options: BookStore.getShelfNameList(),
            currentShelf: this.props.shelf
        }

        this.handUpShelf = this.handUpShelf.bind(this)
    }

    handUpShelf(shelf) {
        if (this.props.handUpShelf) {
            this.props.handUpShelf(shelf)
        }
    }

    render () {
        
        const { options, currentShelf } = this.state

        return (
            <div className="book-shelf-changer">            
                <select value={currentShelf} onChange={(e) => this.handUpShelf(e.target.value)}>
                    <option disabled>move to...</option>
                    {options.map((option) => (<option value={option} key={option}>{option}</option>))}
                </select>
            </div>
        )
    }
}

export default SelectShelf