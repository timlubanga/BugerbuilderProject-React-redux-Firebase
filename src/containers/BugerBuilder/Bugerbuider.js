import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Buger/Buger';
import BuildControls from '../../components/Buger/BuildControls/Buildcontrols';
import Modal from './../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Buger/Ordersummary/Ordersummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorhandler/withErrorHandler';
import {connect} from 'react-redux';
import * as bugerbuilderactions from '../../store/actions/index';


class BugerBuilder extends Component{
    state={
        purchasing:false,
        
    }
    updatedPriceHandler=(ingredients)=>{
        const sum=Object.values(ingredients).reduce((acc,initial)=>{
            return acc+initial;

        });
        return sum>0;

    }

   componentWillMount(){
    
        this.props.initingredients();
    
    }

componentDidUpdate(){

        if (this.props.iserror){
        this.props.history.push("/auth")

    }
}
 purchaseHandler=()=>{
     this.setState({purchasing:true})
     
 }

 handleShow=()=>{
     this.setState({purchasing:false})
 }
 purchaseContinuedHandler= ()=>{

    if (this.props.isAuth){
        this.props.history.push(
            {pathname:"/checkout",
                 }
            );
    }
    else{
        this.props.history.push("/auth")
    }
    
}

    render(){
        let burger=null;
       
        const setDisabled={...this.props.ingre};
        for (let key in setDisabled){
            setDisabled[key]=setDisabled[key]<=0;
        };


    //set disabled for More button
    const setMoreDisabled={}
        for(let key in this.props.ingre){
        setMoreDisabled[key]=this.props.ingre[key]>=2
    }

        let display=<OrderSummary ingredients={this.props.ingre}
        purchaseCanceled={this.handleShow}
        purchaseContinued={this.purchaseContinuedHandler}
        totalPrice={this.props.totalPrice}/>

        if(this.props.loading){
            burger=<Spinner/>
        }
        if(this.props.ingre){

            burger=(
                <Aux>
                <Modal show={this.state.purchasing} handleShow={this.handleShow}>
                    {display}
                </Modal>
                <Modal show={this.props.maximumreach} handleShow={this.props.cancelmodal}>
                    <p style={{color:"red",
                    fontSize:"px", 
                    fontWeight:"bold"}}>
                        you have reached the maximum number of ingredients to select!</p>
                </Modal>

                <Burger ingredients={this.props.ingre}/>
                <BuildControls 
                    added={this.props.addIngredient}
                    remove={this.props.removeIngredient}
                    totalPrice={this.props.totalPrice}
                    setDisabled={setDisabled}
                    setMoreDisabled={setMoreDisabled}
                    isAuth={this.props.isAuth}
                    purchase={this.purchaseHandler}
                    disableButton={this.updatedPriceHandler(this.props.ingre)}
                />
                </Aux>
            )
        }

        if(this.props.error){
            burger=<p>ingredients could not be loaded</p>
        }

          /// handling error locally
        // if(this.state.error){
        //     display=<p>{this.state.error}</p>
        // }
        
        return( 
        <Aux>
            {burger}
        </Aux>
            
        );

    }

}

const mapStatetoProps=(state)=>{
    return{
        ingre:state.build.ingredients,
        totalPrice:state.build.totalPrice,
        loading:state.build.loading,
        error:state.build.error,
        iserror:state.auth.error,
        maximumreach:state.build.maximumreach,
        isAuth:state.auth.token !==null
    }
}

const mapDispatchtoProps=(dispatch)=>{
    return {
        addIngredient:(itemName)=>dispatch(bugerbuilderactions.addingredient(itemName)),
        removeIngredient:(itemName)=>dispatch(bugerbuilderactions.removeingredient(itemName)),
        initingredients:()=>dispatch(bugerbuilderactions.Initgredients()),
        cancelmodal:()=>dispatch(bugerbuilderactions.cancelmodal())
    }
}

export default connect(mapStatetoProps,mapDispatchtoProps)(withErrorhandler(BugerBuilder,axios));