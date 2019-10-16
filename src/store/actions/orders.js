import * as actionTypes from "./actionsTypes";
import axios from '../../axios-order';

const initialpostorder=()=>{
    return{
            type:actionTypes.INITPOSTORDER
    }
}

const postorder_success=()=>{
    return{
        type:actionTypes.POSTORDER_SUCCESS
    }
}


const postorder_failed=()=>{
    return{
        type:actionTypes.POSTORDER_FAILED
    }
}

export const setpostorder=(data)=>{
    return (dispatch)=>{
    dispatch(initialpostorder())
    axios.post('/orders.json',data)
     .then(()=>{ 
         setTimeout(()=>{
             dispatch(postorder_success())
         },5000)  
     })

    .catch(()=>{
        dispatch(postorder_failed())
    }) 

    } 
}

export const postorderCancel=()=>{
    return{
        type:actionTypes.POST_CANCEL
    }
}


const initgetingredients=()=>{
    return{
    type:actionTypes.INITGETORDER
    }
}

const getingreidents_success=(orders)=>{
console.log(orders)
    const fetchedOrders=[];
        for (let key in orders.data){
        if(orders.data[key].ingredients){
        fetchedOrders.push({...orders.data[key],id:key})
        }
        
    }

    
    return{
        type:actionTypes.GETORDER_SUCCESS,
        orders:fetchedOrders,
    }

}

const getingreidents_failed=(error)=>{
  console.log(error)
    return{
        type:actionTypes.GETORDER_FAILED,
        error:error.message
        

    }
}


export const setgetorders=(token)=>{
   
return (dispatch)=>{
   dispatch(initgetingredients())
    axios.get("/orders.json?auth="+token)
    .then(response=>{
        
       dispatch(getingreidents_success(response))
           
    })
    .catch((error)=>{
        dispatch(getingreidents_failed(error))
    })

}
}

    

 


