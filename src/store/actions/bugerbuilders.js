import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';

export const addingredient=(itemName)=>{
    return {
        type:actionTypes.ADDITEM,
        name:itemName
    }
}

export const removeingredient=(itemName)=>{
    return {
        type:actionTypes.REMOVEITEM,
        name:itemName
    }
}

export const cancelmodal=()=>{
    return {
      type:actionTypes.CANCELMODAL  
    }
}

const setIngredients=(ingre)=>{
    
    return {
        type:actionTypes.FETCHINGRE_SUCCESS,
        Ingredients:ingre
    }
}

const catchIngredients=()=>{
    return {
        type:actionTypes.FETCHINGRE_FAILED,
        
    }
}

const initloading=()=>{
    return {
        type:actionTypes.INITFETCH
    }
}

export const Initgredients=()=>{
    return (dispatch)=>{
        dispatch(initloading());
        axios.get("/Ingredients.json")
        .then(response=>{
            dispatch(setIngredients(response.data))

        })
        .catch(()=>{
            dispatch(catchIngredients())
        })
    }
}




