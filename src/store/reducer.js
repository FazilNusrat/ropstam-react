import { createStore } from "redux";

const initialState = {
    users: [],
    products : [
        {
            id: 1,
            name: 'Pen',
            price: 5
        },
        {
            id: 2,
            name: 'Pencil',
            price: 2
        },
        {
            id: 3,
            name: 'Eraser',
            price: 3
        },
        {
            id: 4,
            name: 'Sharpner',
            price: 4
        }
    ],
    cart : []
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case "REGISTER":
            return {
                ...state,
                users : [...state.users, action.payload]
            }

            case "LOGIN":
                return{
                    ...state,
                    user: action.payload
                }

            case "LOGOUT":
                return{
                    ...state,
                    user: null
                }

            default :
            return state;
    }
}

export default createStore (reducer)