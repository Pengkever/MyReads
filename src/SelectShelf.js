import React, { Component } from 'react'

class SelectShelf extends Component {

    state = {
        options: ['currentlyReading', 'wantToRead', 'read', 'None']
    }
    /* 监控选项改变 */
    handleChange = (shelf) => {
        // 只有当shelf 发生改变时，才执行
        if (shelf !== this.state.currentShelf) {
            this.setState({currentShelf: shelf})

            if (this.props.getShelf) {
                this.props.getShelf(shelf)
            }            
        }
    }

    render () {
        
        const { options } = this.state
        const currentShelf = this.state.currentShelf || this.props.shelf

        return (
            <div className="book-shelf-changer">
                <select value={currentShelf} onChange={(e) => this.handleChange(e.target.value)}>
                    <option disabled>move to...</option>
                    {options.map((option) => (<option value={option} key={option} onChange={(e) =>this.handleChange(e.target.value)}>{option}</option>))}                
                </select>
            </div>
        )
    }
}

export default SelectShelf