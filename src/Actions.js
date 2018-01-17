import * as ActionTypes from './ActionTypes'
import AppDispatcher from './AppDispatcher'

export const change = (book, shelf) => {
    AppDispatcher.dispatch({
        type: ActionTypes.CHANGE_SHELF,
        book: book,
        shelf: shelf
    })
}

export const search = (query) => {
    AppDispatcher.dispatch({
        type: ActionTypes.SEARCH,
        query: query
    })
}

export const initialData = () => {
    AppDispatcher.dispatch({
        type: ActionTypes.INIT
    })
}