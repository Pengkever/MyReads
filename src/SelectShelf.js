import React, { Component } from 'react'

class SelectShelf extends Component {

    state = {
        options: ['Currently Reading', 'Want to Read', 'Read', 'None'],
        currentValue: null,
        currentShelf: null
    }

    componentWillMount() {
        this.setState({
            currentShelf: this.props.shelf,
            currentValue: this.props.selectInfoState,
            pf: navigator.platform
        })
    }

    /*componentWillReceiveProps() {

        this.setState({
            currentValue: this.props.selectInfoState
        })
    }*/

    /*updateState = () => {
        this.setState({
            currentValue: this.props.selectInfoState
        })
    }

    selectToggle = () => {

        this.setState((state) => {
            const value = !this.state.currentValue
            state.currentValue = value

            if (this.props.updateValue) {
                this.props.updateValue(value)
            }            
        })
    }
    */

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
        
        const { currentValue, options, currentShelf, pf } = this.state
        console.log(pf)

        return (
            <div className="book-shelf-changer" onClick={() => {this.setState({currentValue: !currentValue})}}>
            { currentValue? (
                <div className="select">
                    <div>move to...</div>
                    <ul>
                        {options.map((option) => ( (option === currentShelf)? (
                            <li className="select-item selected" key={option} onClick={(e) => this.handleChange(e.target.innerText)}>{option}</li>
                        ) : (<li className="select-item" key={option} onClick={(e) => this.handleChange(e.target.innerText)}>{option}</li>)
                        ))}
                    </ul>
                </div>
                ) : (
                    ''
                )
            }
            {/*<select value={currentValue} onChange={(e) => this.handleChange(e.target.value)}>
                {options.map((option) => (
                    option === 'move to...'? (<option value={option} key={option} disabled>{ option }</option>) : (
                        <option value={option} key={option}>{ option }</option>
                    )
                ))}
                
            </select>*/}
            </div>
        )
    }
}

export default SelectShelf