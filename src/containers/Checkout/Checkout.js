import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/Contact-data/Contact-data';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionsTypes';


class Checkout extends Component{

successeventHandler=()=>{
    this.props.resetpurchasing();
    this.props.history.replace("/checkout/contact-data");
    
}

componentWillUnmount(){
    
}
    

canceleventHandler=()=>{
    this.props.history.goBack();
    // this.props.resetIngre();
}


render(){
    let summary=<Redirect to="/"/>
    if (this.props.ingre){
        summary=(<div>
        <CheckoutSummary 
            ingredients={this.props.ingre} 
            successful={this.successeventHandler}
            cancelled={this.canceleventHandler}>
        </CheckoutSummary>
        <Route path={this.props.match.path+"/contact-data"} component={ContactData}/>
        </div>)
    }
    return summary;
       
        
}

}


const mapStatetoProps=(state)=>{
    return {ingre:state.build.ingredients}
}

// const mapDispatchtoProps=(dispatch)=>{
//     return {resetIngre:()=>dispatch({type:"RESETINGRE"})}
// }

const mapDispatchtoProps=(dispatch)=>{
    return{
        resetpurchasing:()=>dispatch({type:actionTypes.RESETPURCHASE})
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout);