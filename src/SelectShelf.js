import React, { Component } from 'react'

class SelectShelf extends Component {

    state = {
        options: ['currentlyReading', 'wantToRead', 'read', 'None'],
        /*options: [{currentlyReading: 'Currently Reading'}, { wantToRead: 'Want to Read'}, {read: 'Read'}, {none: 'None'}],*/
        currentValue: false,
        currentShelf: null,
        isWindowsPlatform: /windows|win32/i.test(navigator.userAgent)
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
        
        const { currentValue, options, isWindowsPlatform } = this.state        
        const currentShelf = this.state.currentShelf || this.props.shelf

        return (
            <div className="book-shelf-changer">
            {isWindowsPlatform? 
                (<div onClick={() => this.setState({currentValue: !currentValue})}>
                    { currentValue? 
                        (<div className="select">
                            <div>move to...</div>
                            <ul>
                                {options.map((option) => (
                                    <li className={(option === currentShelf)? "select-item selected": "select-item"} key={option} onClick={(e) => this.handleChange(e.target.innerText)}>{option}</li>
                                ))}
                            </ul>
                        </div>)
                        : ('')
                    }
                    </div>)
                :
                (<select value={currentShelf} onChange={(e) => this.handleChange(e.target.value)}>
                    <option disabled>move to...</option>
                    {options.map((option) => (<option value={option} key={option} onChange={(e) =>this.handleChange(e.target.value)}>{option}</option>))}                
                </select>)
            }
            </div>
        )
    }
}

export default SelectShelf