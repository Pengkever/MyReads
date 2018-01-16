import * as ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'

export const change = (bookId, shelf) => {
    console.log('Action change')
    AppDispatcher.dispatch({
        type: ActionTypes.CHANGE_SHELF,
        bookId: bookId,
        shelf: shelf
    })
}