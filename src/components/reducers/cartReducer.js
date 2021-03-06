import { ADD_TO_CART, REMOVE_ITEM, SUBTRACT_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING } from '../actions/action-types/cart-actions'

import Item1 from "../../images/item1.jpg"
import Item2 from "../../images/item2.jpg"
import Item3 from "../../images/item3.jpg"
import Item4 from "../../images/item4.jpg"
import Item5 from "../../images/item5.jpg"
import Item6 from "../../images/item6.jpg"

const initState = {
    items: [
        {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:110,img:Item1},
        {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:80,img: Item2},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:120,img: Item3},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:260,img:Item4},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", price:160,img: Item5},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",price:90,img: Item6}
    ],
    addedItems: [],
    total: 0
}

const cartReducer = (state = initState, action) => {
    // Inside home component
    if (action.type === ADD_TO_CART) {
        let addedItem = state.items.find(item => item.id === action.id)

        // Check if the action id exists in the addedItems
        let existed_item = state.addedItems.find(item => item.id === action.id)

        if (existed_item) {
            addedItem.quantity += 1

            return {
                ...state,
                total: state.total + addedItem.price
            }
        } else {
            addedItem.quantity = 1

            // calculating the total
            let newTotal = state.total + addedItem.price
            
            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal
            }
        }
    } else if (action.type === REMOVE_ITEM) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let updatedAddedItems = state.addedItems.filter(item => item.id !== action.id)

        // Calculate the new total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)

        return {
            ...state,
            addedItems: updatedAddedItems,
            total: newTotal
        }
    } else if (action.type === ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)

        addedItem.quantity++

        let newTotal = state.total + addedItem.price

        return {
            ...state,
            total: newTotal
        }
    } else if (action.type === SUBTRACT_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id)

        // If the qty === 0 this we should remove
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        } else {
            addedItem.quantity--

            let newTotal = state.total - addedItem.price

            return {
                ...state,
                total: newTotal
            }
        }
    } else if (action.type === ADD_SHIPPING) {
        return {
            ...state,
            total: state.total + 6
        }
    } else if (action.type === SUB_SHIPPING) {
        return {
            ...state,
            total: state.total - 6
        }
    } else {
        return state;
    }
}

export default cartReducer