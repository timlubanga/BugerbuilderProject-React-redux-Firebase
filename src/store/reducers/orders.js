import * as actionTypes from '../actions/actionsTypes';
const initialState={
    orders:[],
    loading:false,
    show:false,
    error:false,
    success:false
}


const reducer=(state=initialState, action)=>{

    switch(action.type){

        case(actionTypes.RESETPURCHASE):
        return{
            ...state,
            success:false
        }
        case(actionTypes.INITPOSTORDER):
        return{
            ...state,
            loading:true,
            show:true,
            

        }

        case(actionTypes.POSTORDER_SUCCESS):
        return{
            ...state,
            loading:false,
            show:true,

        }

        case(actionTypes.POSTORDER_FAILED):
        return{
            ...state,
            loading:false,
            show:true,
            error:true
        }

        case(actionTypes.POST_CANCEL):
            return{
                ...state,
                show:false,
                success:true
            }

        case(actionTypes.INITGETORDER):
        return{
            ...state,
            loading:true,
            error:false
        }

        case(actionTypes.GETORDER_SUCCESS):
        
        return{
            ...state,
            orders:action.orders,
            loading:false
        }

        case(actionTypes.GETORDER_FAILED):
        return{
            ...state,
            loading:false,
            error:action.error
        }
        
        default:
            return state

    }

}


export default reducer;