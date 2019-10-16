import * as actionTypes from '../actions/actionsTypes';
import {ingreSumation} from '../utils/checkitems';

const ingredientsPerPrice={
    salad: 0.67,
    bacon:0.5,
    cheese:0.8,
    meat:1
}


 const initialState={
    ingredients:null,
    totalPrice:3,
    error:false,
    loading:false,
    maximumreach:false
}

const reducer=(state=initialState, action)=>{
    
    switch(action.type){

        // case(actionTypes.RESETINGRE):
        // const initial=3
        // return{
        //     ...state,
        //     totalPrice:initial
        // }

        case(actionTypes.INITFETCH):
        return{
            ...state,
            totalPrice:3,
            totalingre:0,
            loading:true
        }
        
        case(actionTypes.FETCHINGRE_SUCCESS):

        const ingredientsPrice=Object.keys(action.Ingredients).flatMap(el=>{
            return [...Array(action.Ingredients[el])].map(_=>{
                return el;
            })
        }).reduce((acc,init)=>{
            return acc+ingredientsPerPrice[init]
        },0)
        
            return{
                ...state,
                ingredients:action.Ingredients,
                loading:false,
                totalPrice: state.totalPrice+ingredientsPrice
            }
        case(actionTypes.FETCHINGRE_FAILED):
        return{
                ...state,
                error:true,
                loading:false
            }
        case(actionTypes.ADDITEM):
            let ingre={
                ...state.ingredients,
                [action.name]: state.ingredients[action.name]+1
            }
            let sum=ingreSumation(ingre)
            
            return{
                ...state,
                maximumreach:sum>=8,
                ingredients:ingre,
                totalPrice:state.totalPrice+ingredientsPerPrice[action.name]
            }

        case(actionTypes.CANCELMODAL):
            return {
                ...state,
                maximumreach:false
            }


        case(actionTypes.REMOVEITEM):
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.name]: state.ingredients[action.name]-1
            },
            totalPrice:state.totalPrice-ingredientsPerPrice[action.name]

    
        }

        default:
            return {...state}
    }


}

export default reducer;