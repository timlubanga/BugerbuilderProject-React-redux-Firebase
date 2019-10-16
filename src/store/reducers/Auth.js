
import * as actionTypes  from '../actions/actionsTypes';

const initialState={
    loading:false,
    token:null,
    error:null,
    userID:null
}

const reducer=(state=initialState, action)=>{
     switch(action.type){

         case(actionTypes.INITAUTH):
         return{
             ...state,
             loading:true,
             token:null,
             error:null,
         }

         case(actionTypes.AUTH_SUCCESS):
             return{
                 ...state,
                 loading:false,
                 error:null,
                 token:action.idToken,
                 userID:action.userID
             }

        case(actionTypes.AUTH_FAILED):
        console.log(action.error)
        return{
            ...state,
            loading:false,
            error:action.error,
        }

        case(actionTypes.AUTH_LOGOUT):
        return{
            ...state,
            userID:null,
            token:null
        }

        default:
            return {...state};
         
     }
}


export default reducer;